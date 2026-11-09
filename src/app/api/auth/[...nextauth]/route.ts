import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

const OWNER_EMAILS = [
  'msgboys832@gmail.com',
  'boysmsg832@gmail.com',
  'shifan@pokefun.in',
  'shifangouri01@gmail.com',
  'pokefunsmp@gmail.com'
];
const OWNER_USERNAMES = ['boysmsg01', 'pokefunadmin'];
const ALL_PERMISSIONS = [
  'DELETE_POSTS', 'ANNOUNCEMENTS', 'MANAGE_ROLES', 'READ_DMS',
  'BAN_USERS', 'MANAGE_GIVEAWAYS_POLLS', 'MANAGE_EVENTS_TOURNAMENTS', 'MANAGE_REWARDS_STORE'
];

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
      issuer: "https://discord.com",
      checks: ["none"],
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      checks: ["none"],
    }),
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        twoFactorCode: { label: "2FA Code", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const cleanEmail = credentials.email.trim().toLowerCase();
        const cleanPass = credentials.password.trim();
        const allowedEmails = ['boysmsg832@gmail.com', 'msgboys832@gmail.com', 'shifan@pokefun.in', 'shifangouri01@gmail.com', 'pokefunsmp@gmail.com'];
        const allowedPasswords = ['Ladka@bedrock123*', 'kalu#$0109msg$pokefun', 'ShifanAdmin2026!', process.env.ADMIN_PASSWORD];
        
        if (allowedEmails.includes(cleanEmail) && (allowedPasswords.some(p => p && p === cleanPass) || cleanPass === "Ladka@bedrock123*")) {
          try {
            await dbConnect();
            let adminUser = await User.findOne({ email: cleanEmail });
            if (!adminUser) {
              adminUser = await User.create({
                email: cleanEmail,
                username: cleanEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, ''),
                name: "Pokefun Admin",
                role: "OWNER",
                permissions: ALL_PERMISSIONS
              });
            } else {
              adminUser.role = "OWNER";
              adminUser.permissions = ALL_PERMISSIONS;
              await adminUser.save();
            }
            return { id: adminUser._id.toString(), username: adminUser.username, name: adminUser.name, email: adminUser.email, role: "OWNER", permissions: ALL_PERMISSIONS };
          } catch (error) {
            console.warn("MongoDB connection failed in Admin Auth, allowing temporary admin session.");
            return { id: "temp-admin-id", username: "admin", name: "Pokefun Admin", email: cleanEmail, role: "OWNER", permissions: ALL_PERMISSIONS };
          }
        }
        return null;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "discord" || account?.provider === "google") {
        try {
          await dbConnect();
          const emailLower = (user.email || "").toLowerCase();
          let dbUser = await User.findOne({ email: emailLower });
          const isOwnerAccount = OWNER_EMAILS.includes(emailLower) || OWNER_USERNAMES.includes((user.name || "").toLowerCase());

          if (!dbUser && user.email) {
            const baseName = (user.name || "trainer").toLowerCase().replace(/[^a-z0-9_]/g, '');
            const randomSuffix = Math.floor(Math.random() * 10000).toString();
            const newUsername = isOwnerAccount ? 'boysmsg01' : `${baseName}${randomSuffix}`;

            dbUser = await User.create({
              email: emailLower,
              username: newUsername,
              name: user.name || "Trainer",
              image: user.image ?? undefined,
              discordId: account?.provider === "discord" ? account?.providerAccountId : undefined,
              role: isOwnerAccount ? "OWNER" : "USER",
              permissions: isOwnerAccount ? ALL_PERMISSIONS : [],
              connections: {
                discord: account?.provider === "discord" ? (user.name ?? undefined) : undefined,
                google: account?.provider === "google" ? (user.email ?? undefined) : undefined
              }
            });
          } else if (dbUser) {
            let isUpdated = false;
            if (!dbUser.connections) dbUser.connections = {};
            
            if (account?.provider === "discord" && !dbUser.connections.discord) {
              dbUser.connections.discord = user.name ?? undefined;
              dbUser.discordId = account.providerAccountId;
              isUpdated = true;
            }
            if (account?.provider === "google" && !dbUser.connections.google) {
              dbUser.connections.google = user.email ?? undefined;
              isUpdated = true;
            }

            if (account?.provider === "discord" && user.image) {
              dbUser.image = user.image;
              isUpdated = true;
            } else if (account?.provider === "google" && user.image && !dbUser.connections.discord) {
              dbUser.image = user.image;
              isUpdated = true;
            }

            if (isOwnerAccount && (dbUser.role !== "OWNER" || !dbUser.permissions || dbUser.permissions.length === 0)) {
              dbUser.role = "OWNER";
              dbUser.permissions = ALL_PERMISSIONS;
              isUpdated = true;
            }

            if (isUpdated) {
              await User.updateOne({ _id: dbUser._id }, { $set: { connections: dbUser.connections, discordId: dbUser.discordId, image: dbUser.image, role: dbUser.role, permissions: dbUser.permissions } });
            }
          }

          if (dbUser) {
             (user as any).role = dbUser.role;
             (user as any).permissions = dbUser.permissions || [];
             (user as any).username = dbUser.username;
             user.image = dbUser.image || user.image;
          }
        } catch (error) {
          console.warn("MongoDB connection failed in signIn, fallback to local session.", error);
          const isOwnerAccount = OWNER_EMAILS.includes((user.email || "").toLowerCase());
          (user as any).role = isOwnerAccount ? "OWNER" : "USER";
          (user as any).permissions = isOwnerAccount ? ALL_PERMISSIONS : [];
          (user as any).username = user.name || "trainer";
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || "USER";
        token.permissions = (user as any).permissions || [];
        token.username = (user as any).username || (user.name || "trainer");
        token.picture = user.image;
      }
      
      const emailLower = (token.email || "").toLowerCase();
      const usernameLower = (token.username as string || "").toLowerCase();
      if (OWNER_EMAILS.includes(emailLower) || OWNER_USERNAMES.includes(usernameLower)) {
        token.role = "OWNER";
        token.permissions = ALL_PERMISSIONS;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role || "USER";
        (session.user as any).permissions = token.permissions || [];
        (session.user as any).username = token.username || session.user.name;

        const emailLower = (session.user.email || "").toLowerCase();
        const usernameLower = ((session.user as any).username || "").toLowerCase();
        if (OWNER_EMAILS.includes(emailLower) || OWNER_USERNAMES.includes(usernameLower)) {
          (session.user as any).role = "OWNER";
          (session.user as any).permissions = ALL_PERMISSIONS;
        }
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/login',
    error: '/login',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
