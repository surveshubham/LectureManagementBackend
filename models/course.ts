import mongoose from "mongoose";
const { Schema } = mongoose;

const Course = new Schema({
    name: { type: String },
    level: {type: String},
    description: { type: String },
})

const CourseModel = mongoose.model("Courses", Course);
export default CourseModel;