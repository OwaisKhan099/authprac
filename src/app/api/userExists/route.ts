import { NextResponse } from "next/server";
import { ConnectMongoDb } from "../../../../lib/mongodb";
import User_ from "../../../../models/users";
import bcrypt from "bcrypt";
export async function POST(req:any){
    try {
        //connecting to DB
        await ConnectMongoDb();
        //checking whether email existts in the DB
        //converting to JSON form
        const {email} = await req.json()
        //finding it from the DB using the defined model
        const user = await User_.findOne({email}).select("_id")
        const pw = await User_.findOne({email}).select("password")
        console.log(`User from UserExists: ${user._id} ${typeof user._id}`)
        console.log(`User from UserExists: ${pw.password} ${typeof pw.password}`)

        
        const passMatch = await bcrypt.compare("password", "password");
        console.log(`This is it -------> ${passMatch} ${pw.password}`)
        //returning user in json format.
        
            console.log(`User from UserExists: ${user}`)
            return NextResponse.json({user});
       
    } catch (error) {
        //console.log(error)
        console.log("--------------------------------------------------------")
        return NextResponse.json("");
    }
}
// export async function POST(req:any) {
//     try {
//       await ConnectMongoDb();
//       const { email } = await req.json();
//       const user = await User_.findOne({ email }).select("_id");
//       console.log("user: ", user);
//       return NextResponse.json({ user });
//     } catch (error) {
//       console.log(error);
//     }
//   }