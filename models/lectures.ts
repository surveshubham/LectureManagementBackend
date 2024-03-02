import mongoose from "mongoose";
const { Schema } = mongoose;

const Lecture = new Schema({
    lectureNo : {type: String },
    course: { type: String },
    instructor: {type: String},
    date: { type: Date},
})

const LectureModel = mongoose.model("Lectures", Lecture);
export default LectureModel;