import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectMongoDb } from "../../../../../lib/mongodb";
import User_ from "../../../../../models/users";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import { use } from "react";

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

    async authorize(credentials:any) {
      // Add logic here to look up the user from the credentials supplied
      const user = await { id: "1", name: 'admin', email: 'admin@example.com' };
      const username_ = await credentials?.email;
      user.email = await credentials?.email;
      

      //const {Username} = await credentials.json();
      console.log("trying")
      const PW = await credentials?.password;
      console.log(`These arer credentials, teken from login page:   ${user.email} , ${PW} `, typeof user.email);
      
      try {
        await ConnectMongoDb();
        console.log("connected");
        // const id = await User_.findOne({email:username_}).select("_id")
        const userFound = await User_.findOne({email:user.email})
        const id = await User_.findOne({email:user.email}).select("_id")
        const name = await  User_.findOne({email:user.email}).select("name")
        const passMatch = await bcrypt.compare(PW, userFound.password)
        user.name = name.name;

        console.log(passMatch, typeof id, id, userFound._id, userFound.name, userFound.password)
        if(!id){
          return null
        }

        if(!passMatch){
          return null
        }
        
      } catch (error) {
        console.log(error)
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
        signIn:"/",
},
};

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}