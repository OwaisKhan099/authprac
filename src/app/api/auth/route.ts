import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectMongoDb } from "../../../../lib/mongodb";
import User_ from "../../../../models/users";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";

export const authOptions:NextAuthOptions  = {
providers: [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {},
    // email: { label: "Username", type: "text", placeholder: "jsmith" },
    //   password: { label: "Password", type: "password" }

    async authorize(credentials) {
      // Add logic here to look up the user from the credentials supplied
      const user = { id: "1"};
    //   const email= credentials?.email?? 'email is not given';
    //   const password = credentials?.password?? 'password is not given';

    //   try {
    //     await ConnectMongoDb();
    //     const user = User_.findOne({email}).select("_id")
    //     if(!user){
    //         return null;
    //     }
    //     const pw = await User_.findOne({email}).select("password")
    //     const passMatch = await bcrypt.compare(password, pw.password);
    //     if(!passMatch){
    //         return null
    //     }

    //   } catch (error) {
        
    //   }

    return user
    //   if (user) {
    //     // Any object returned will be saved in `user` property of the JWT
    //     return user
    //   } else {
    //     // If you return null then an error will be displayed advising the user to check their details.
    //     return null

    //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //   }
    },
  }),
],
session:{
    
    strategy: "jwt",
},
secret:process.env.NEXTAUTH_SECRET,
pages:{
        signIn:"/"
},
};



const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}