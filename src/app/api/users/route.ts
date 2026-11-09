import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongoose';
import User from '@/models/User';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    // Update calling user's lastActive so they appear Online
    User.updateOne({ email: session.user.email }, { $set: { lastActive: new Date() } }).exec().catch(() => {});

    // Fetch all users except the current logged-in user
    const users = await User.find({ email: { $ne: session.user.email } })
      .select('name username image role discordId lastActive')
      .lean();

    const threeMinutesAgo = new Date(Date.now() - 3 * 60 * 1000);
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

    const formattedUsers = users.map(u => {
      let status = 'Offline';
      if (u.lastActive) {
        const last = new Date(u.lastActive);
        if (last > threeMinutesAgo) status = 'Online';
        else if (last > fifteenMinutesAgo) status = 'Idle';
      }
      return {
        name: u.name,
        username: u.username,
        image: u.image,
        role: u.role,
        discordId: u.discordId,
        status
      };
    });

    // Always sort so Online users are at the top, then Idle, then Offline
    formattedUsers.sort((a, b) => {
      const valA = a.status === 'Online' ? 2 : (a.status === 'Idle' ? 1 : 0);
      const valB = b.status === 'Online' ? 2 : (b.status === 'Idle' ? 1 : 0);
      if (valB !== valA) return valB - valA;
      return (a.name || a.username || '').localeCompare(b.name || b.username || '');
    });

    return NextResponse.json({ users: formattedUsers });
  } catch (error: any) {
    console.error("GET Users Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
