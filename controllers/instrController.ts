import InstructorModel from "../models/Instructor";
import { Request, Response } from "express";

//create a new instructor
export const createInstructor = async (req: Request, res: Response) => {
    try {

        const { name, email, password }: any = req.body;


        let user = await InstructorModel.findOne({ email: email });

        if (user) {
            return res.json({
                error: "A instructor with this email already exists. Please try again with a different email.",
            });
        }

        user = await InstructorModel.create({
            name: name,
            email: email,
            password: password,
        });

        //show success message here;
        res.json({ user });

    } catch (error: any) {
        console.log("Error in signup : ", error.toString());
        res
            .sendStatus(500)
            .json({ error: "Something went wrong, please try again later" });
        return;
    }
};

export const getInstructor = async (req: Request, res: Response) => {
    try {

        const { email, password }: any = req.body;

        let user = await InstructorModel.find({ email: email, password: password });

        if (!user) {
            return res.json({
                error: "User credentials did not match",
            });
        }

        //show success message here;
        res.json({ user });

    } catch (error: any) {
        console.log("Error in signup : ", error.toString());
        res
            .sendStatus(500)
            .json({ error: "Something went wrong, please try again later" });
        return;
    }
};

export const getAllInstructor = async (req: Request, res: Response) => {
    try {

        //Get user with email and name exclude password
        let user = await InstructorModel.aggregate([
            { $match: {} },
            { $project: { _id: 1, name: 1, email: 1 } }
        ]);

        //show success message here;
        res.json({ user });

    } catch (error: any) {
        console.log("Error in finding all users : ", error.toString());
        res
            .sendStatus(500)
            .json({ error: "Something went wrong, please try again later" });
        return;
    }
};



export const getAlllecture = async (req: Request, res: Response) => {
    try {

        const { email }: any = req.body;

        //Get user with email and name exclude password
        let user = await InstructorModel.aggregate([
            { $match: {email : email} },
            {
                $lookup: {
                    from: "lectures",
                    localField: "lecture",
                    foreignField: "lectureNo",
                    as: "newfields",
                }
            },
        ]);

        //show success message here;
        res.json({ user });

    } catch (error: any) {
        console.log("Error in finding lecture : ", error.toString());
        res
            .sendStatus(500)
            .json({ error: "Something went wrong, please try again later" });
        return;
    }
};

