import mongoose from "mongoose";

const { Schema } = mongoose;

const movieSchema = new Schema({
  name: {
    type: String,
    required:[true,"lütfen kullanıcı adı giriniz"],
  },
  category:{
    type: Schema.Types.ObjectId,
    ref:"Category",
  },
  description: {
    type: String,
    required:[true,"lütfen film özeti giriniz"],
    trim: true,
  },
  year: {
    type: String,  
    required:[true,"lütfen yapım yılı giriniz"],
  },
  director: {
    type: String,  
    required:[true,"lütfen yönetmen giriniz"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref:"User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  poster_url:{
    type:String,
    required:true,

  },
  poster_id:{
    type:String,
  },
});

const movie = mongoose.model("Movie", movieSchema);

export default movie;
