import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "./dbConnect";
import {User} from "./models/UserModel"
import userService from "./services/userService";
import bcrypt from "bcryptjs";

export const config = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
        
        if (credentials == null) return null;
        
        const user:any = await userService.getUserByEmail(credentials.email as string);
        console.log(user);
        if (user) {
          const isMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (isMatch) {
            return user;
          }
        }else{
          console.log("User not found");
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    newUser: "/register",
    error: "/signin",
  },
  callbacks: {
    
    async jwt({ user, trigger, session, token }: any) {
      console.log(user);
      console.log(token);
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          role: user.role,
        }
      }
      console.log(token);
      console.log(session)
      if (trigger === "update" && session) {
        token.user = {
          ...token.user,
          email: session.user.email,
          name: session.user.name,
          role: session.user.role,
        }
      }
      return token
    },
    session: async ({ session, token }: any) => {
      if (token) {
        console.log(token);
        session.user = token.user;
      }
      return session;
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);


