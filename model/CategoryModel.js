import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

});

const category = mongoose.model("Category", categorySchema);

export default category;
