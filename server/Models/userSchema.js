import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js";


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Name is required"],
        maxLength: [20,"Name must be less than 20"]
    },
    email:{
        type: String,
        required: [true,"Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true,"Password is required"],
        minLength: [8,"Password must be atleast than 8 char"],
        select: false
    },
    role:{
        type: String,
        enum: Object.values(AuthRoles),
        default: AuthRoles.USER
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date, 
 },{
    timestamps: true
   }
);

export default mongoose.model("User",userSchema)