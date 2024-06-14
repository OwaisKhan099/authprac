import mongoose from "mongoose";
export const ConnectMongoDb = async ()=> {
    /*
        This function connects with mongodb
    */

    try {
        mongoose.set('strictQuery', false);
        //node js will find the MONGODB_URI from .env file. .env file should be in the root directory of project
        mongoose.connect(process.env.MONGODB_URI!)
        console.log("Connecting to mongo db")
    } catch (error) {
        console.log(`Facing an error while connecting to the mongodb : ${error}`)
    }
}

