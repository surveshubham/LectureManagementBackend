import express from "express";

import dotenv from "dotenv";
import { createCourse , getAllCourses } from "../controllers/courseController";
dotenv.config();

const router = express.Router();

router.post("/createCourse", createCourse);
router.post("/getAllCourses", getAllCourses);

export = router;
