import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query = (searchParams.get('q') || '').trim();
    const limit = Math.min(parseInt(searchParams.get('limit') || '100', 10), 500);

    const filter: any = {};
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { username: { $regex: query, $options: 'i' } }
      ];
    }

    // Strictly select ONLY public player fields, NEVER email or private data
    const players = await User.find(filter)
      .select('name username image role bio rewardRank rewardLevel lastActive createdAt isRankHolder')
      .sort({ lastActive: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

    const safePlayers = players.map(p => {
      let status = 'Offline';
      if (p.lastActive) {
        const last = new Date(p.lastActive);
        if (last > threeMinutesAgo) status = 'Online';
        else if (last > fifteenMinutesAgo) status = 'Idle';
      }
      return {
        id: p._id.toString(),
        name: p.name || 'Trainer',
        username: p.username || 'trainer',
        image: p.image || '/images/default-avatar.png',
        role: p.role || 'USER',
        bio: p.bio || 'A passionate Pokemon Trainer!',
        rewardRank: p.rewardRank || 'Bronze',
        rewardLevel: p.rewardLevel || 1,
        isRankHolder: !!p.isRankHolder,
        status,
        joinedAt: p.createdAt
      };
    });

    return NextResponse.json({
      success: true,
      total: safePlayers.length,
      players: safePlayers
    });
  } catch (error) {
    console.error("Error fetching public players", error);
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}
