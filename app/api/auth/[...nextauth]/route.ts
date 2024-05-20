import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import userService from "@/lib/services/userService";
import { User } from "@/lib/models/UserModel";

const authOptions = {
  pages: {
    signIn: "/signin",
    newUser: "/register",
    error: "/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials): Promise<any> {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            (credentials as any).email || "",
            (credentials as any).password || ""
          );

          const user = userCredential.user;

          // Periksa apakah email sudah diverifikasi
          if (user.emailVerified) {
            const userDB = await userService.getUserByEmail(user.email as string);

            if (Object.keys(userDB).length === 0) {

              const newUserDB = {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                role: "user",
              } as User;
              try {
                console.log(newUserDB)
                await userService.createUser(newUserDB);

                return {
                  id: user.uid,
                  email: user.email,
                  name: user.displayName,
                  emailVerified: user.emailVerified,
                  role : newUserDB.role
                };
              } catch (error) {

              }
            }

            return {
              id: user.uid,
              email: user.email,
              name: user.displayName,
              emailVerified: user.emailVerified,
              role : userDB.role,
              canteenId: userDB.canteenId,
            };
          } else {

            throw new Error("Email belum diverifikasi");
          }
        } catch (error) {
          console.log("Gagal autorisasi:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.emailVerified = user.emailVerified;
        token.role = user.role;
        token.canteenId = user.canteenId;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.emailVerified = token.emailVerified;
        session.user.role = token.role;
        session.user.canteenId = token.canteenId;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
