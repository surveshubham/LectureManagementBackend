import express from "express";

import dotenv from "dotenv";
import { createInstructor , getInstructor , getAllInstructor , getAlllecture} from "../controllers/instrController";
dotenv.config();

const router = express.Router();

router.post("/createInstructor", createInstructor);
router.post("/getInstructor", getInstructor);
router.post("/getAllInstructor", getAllInstructor);
router.post("/getAlllecture", getAlllecture);

export = router;
