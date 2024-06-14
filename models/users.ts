import mongoose, {Schema, models} from "mongoose";
const UserSchema = new Schema(
 {
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
 {timestamps:true}
);
/* As models.User will giver value to User_ if User(model with the name of user) will be present in models,
otherwise, monoose.model("User",UserSchema) will create a model and will give value to the User_. First time, 
monoose.model("User",UserSchema) will run. Rest of the time, models.User will be run 
*/
const User_ = models.User || mongoose.model("User", UserSchema)
export default User_;