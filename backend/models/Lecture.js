import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  batchName: String,

  date: Date,

  startTime: String,

  endTime: String
});

export default mongoose.model("Lecture", lectureSchema);