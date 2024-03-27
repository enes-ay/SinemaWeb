import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator"

const {Schema}=mongoose

const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"lütfen kullanıcı adı giriniz"],
        lowercase:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"lütfen email giriniz"],
        trim:true,
        unique:true,
        validate:[validator.isEmail,"geçerli bir email giriniz"]
    },
    password:{
        type:String,
        required:[true,"lütfen şifre giriniz"],
        minLength:[8,"en az 8 karakter şifre giriniz"],
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
},
{
    timestamps:true
});
userSchema.pre("save",function(next){
const user=this
bcrypt.hash(user.password,10,(err,hash)=>{
    user.password=hash;
    next();
});
});

const user=mongoose.model("User",userSchema);

export default user;