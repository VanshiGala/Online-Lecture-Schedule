import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  level: {
    type: String,
    required: true
  },

  description: String,

  image: String
});

export default mongoose.model("Course", courseSchema);