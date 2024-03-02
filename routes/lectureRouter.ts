import express from "express";

import dotenv from "dotenv";
import { createLecture , getAllLecture } from "../controllers/lectureController";
dotenv.config();

const router = express.Router();

router.post("/createLecture", createLecture);
router.post("/getAllLecture", getAllLecture);

export = router;
