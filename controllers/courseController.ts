import CourseModel from "../models/course";
import { Request, Response } from "express";

//create a new instructor
export const createCourse = async (req: Request, res: Response) => {
    try {

        const { name, level, description }: any = req.body;

        let course = await CourseModel.findOne({ name: name });

        if (course) {
            return res.json({
                error: "A course with this name already exists.",
            });
        }

        course = await CourseModel.create({
            name: name,
            level: level,
            description: description,
        });

        //show success message here;
        res.json({ course });

    } catch (error: any) {
        console.log("Error in signup : ", error.toString());
        res
            .sendStatus(500)
            .json({ error: "Something went wrong, please try again later" });
        return;
    }
};

export const getAllCourses = async (req: Request, res: Response) => {
    try {

        //Get user with email and name exclude password
        let user = await CourseModel.aggregate([
            { $match: {} },
            { $project: { _id: 1, name: 1, level: 1 , description : 1} }
        ]);

        //show success message here;
        res.json({ user });

    } catch (error: any) {
        console.log("Error in finding all courses : ", error.toString());
        res
            .sendStatus(500)
            .json({ error: "Something went wrong, please try again later" });
        return;
    }
};