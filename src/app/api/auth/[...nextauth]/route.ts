import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectMongoDb } from "../../../../../lib/mongodb";
import User_ from "../../../../../models/users";
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
    //credentials: {},
    
    credentials: {
      email: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" }
    },

    

    async authorize(credentials) {
      // Add logic here to look up the user from the credentials supplied
      const user = await { id: "1", name: 'admin', email: 'admin@example.com' };
      var username_ = await credentials?.email;
      var PW = await credentials?.password;
      console.log(`These arer credentials, teken from login page:   ${username_} , ${PW}`)

      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(PW!,salt);
      try {
        await ConnectMongoDb();
        console.log("connected");
        //const user = await User_.findOne({username_});
        const user = await User_.findOne({username_}).select("_id")
        const pw = await User_.findOne({username_}).select("password")
        console.log(`${user._id} , ${pw.password}`)
        if(!username_){
          return null
        }
        const PassWordMatch = await bcrypt.compare(hash, user.password)
        console.log(`These are PWWWW:   ${hash}_, ${user.password}`)
      } catch (error) {
        
      }

    return user
    
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