import express from "express";
import { createMeeting, getAllMeetings, updateMeeting, deleteMeeting } from "../controllers/meetingController.js";
import { validateMeeting } from "../middleware/authMid.js";

const router = express.Router();

router.post("/api/book", validateMeeting, createMeeting);
router.get("/api/book", getAllMeetings);
router.put("/api/book/:meeting_id", validateMeeting, updateMeeting);
router.delete("/api/book/:meeting_id", deleteMeeting);

export default router;
