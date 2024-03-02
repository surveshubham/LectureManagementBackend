import { Request, Response } from "express";
import LectureModel from "../models/lectures";
import CourseModel from "../models/course";
import InstructorModel from "../models/Instructor";

export const createLecture = async (req: Request, res: Response) => {
    try {

        const { course, instructor, date }: any = req.body;

        //Find COURSE WITH COURSE NAME
        let findCourse = await CourseModel.findOne({ name: course });

        if (!findCourse) {
            return res.json({
                error: "Course with this name does not exists.",
            });
        }

        //Find instructor with instructor name
        let findInstructor = await InstructorModel.findOne({ name: instructor });

        if (!findInstructor) {
            return res.json({
                error: "instructor with this name does not exists.",
            });
        }

        let findEmpLec = await LectureModel.find({ instructor: instructor, date: date });

        if (findEmpLec.length > 0) {
            return res.json({
                error: "instructor has already been assigned",
            });
        }

        if (findEmpLec.length == 0) {


            let lecCount = await LectureModel.countDocuments();

            let lecID = "Lec001";

            if (lecCount != 0) {

                if (lecCount < 10) {
                    lecID = "Lec" + "00" + (lecCount + 1);
                } else if (lecCount < 100) {
                    lecID = "Lec" + "0" + (lecCount + 1);
                } else {
                    lecID = "Lec" + (lecCount + 1);
                }

            }

            let lecture = await LectureModel.create({
                lectureNo: lecID,
                course: course,
                instructor: instructor,
                date: date,
            });


            if (lecture) {
                let empPush = await InstructorModel.updateOne({ name: findInstructor.name }, { $push: { lecture: lecID } });
            }

            //show success message here;
            res.json({ lecture });
        }




    } catch (error: any) {
        console.log("Error in signup : ", error.toString());
        res
            .sendStatus(500)
            .json({ error: "Something went wrong, please try again later" });
        return;
    }
};



export const getAllLecture = async (req: Request, res: Response) => {
    try {

        //Get user with email and name exclude password
        let lecture = await LectureModel.aggregate([
            { $match: {} },
            {
                $sort: { date: 1 }
            }
        ]);

        //show success message here;
        res.json({ lecture });

    } catch (error: any) {
        console.log("Error in finding all lecture : ", error.toString());
        res
            .sendStatus(500)
            .json({ error: "Something went wrong, please try again later" });
        return;
    }
};
