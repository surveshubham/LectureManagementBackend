import mongoose from "mongoose";
const { Schema } = mongoose;

const Instructor = new Schema({
    name: { type: String },
    email: {type: String},
    password: { type: String },
    lecture: [{type : String}]
})

const InstructorModel = mongoose.model("Instructors", Instructor);
export default InstructorModel;