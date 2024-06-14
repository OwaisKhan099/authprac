import { NextResponse } from "next/server";
import { ConnectMongoDb } from "../../../../lib/mongodb";
import User_ from "../../../../models/users";
//import bcrypt from "bcrypt";
import bcrypt from "bcrypt";

//creating an api, which will get registeration data.
export async function POST(req:any){
    try {
    // getting all the data in the json form
    const {name, email, password} = await req.json();
    console.log(`Name : ${name}`);
    console.log(`Email : ${email}`);
    console.log(`Password : ${password}`);
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    //const hashedPW = bcrypt.hash(password, 10);
    console.log(hash)
    await ConnectMongoDb();
    await User_.create({name:name, email:email,password:hash})
    // successful response
    return NextResponse.json({message : "User is registered"}, {status:201})
        
} catch (error) {
    // error response
    return NextResponse.json({message : "Error has occured"}, {status:500})
 
}
}