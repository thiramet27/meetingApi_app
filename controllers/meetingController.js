import Meeting from "../models/meetingModel.js";
import teamMember from "../models/teammemberModel.js";

export const createMeeting = async (req, res) => {
    const { manager_Id, slot, duration, staff_id } = req.body;

    try {
        const teamMemberData = await teamMember.findOne({ staff_id: staff_id });
        
        if (!teamMemberData) {
            return res.status(404).json({
                success: false,
                message: `Team member with staff_id '${staff_id}' not found.`,
            });
        }

        const teamMemberName = teamMemberData.name;

        const existingMeeting = await Meeting.findOne({ manager_Id: manager_Id, time_slot: slot });
        if (existingMeeting) {
            return res.status(400).json({
                success: false,
                message: "A meeting is already scheduled at this time for the manager.",
            });
        }

        const newMeeting = new Meeting({
            manager_Id: manager_Id,
            team_member: teamMemberName,
            time_slot: slot,
            duration: duration,
            staff_id: staff_id
        });

        const savedMeeting = await newMeeting.save();

        res.status(201).json({
            success: true,
            message: "Meeting created successfully.",
            meeting: {
                meeting_id: savedMeeting._id,
                team_member: savedMeeting.team_member,
                time_slot: savedMeeting.time_slot,
                duration: savedMeeting.duration,
                manager_Id: savedMeeting.manager_Id,
                staff_id: savedMeeting.staff_id
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error creating meeting.",
            error: err.message,
        });
    }
};


export const getAllMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find();

        const response = meetings.map(meeting => ({
            meeting_id: meeting._id,
            team_member: meeting.team_member,
            time_slot: meeting.time_slot,
            duration: meeting.duration
        }));

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching meetings.",
            error: err.message,
        });
    }
};


export const updateMeeting = async (req, res) => {
    const { meeting_id } = req.params; 
    const { slot, duration } = req.body; 
    try {
        if (!slot || !duration) {
            return res.status(400).json({
                success: false,
                message: "Both 'slot' and 'duration' are required fields.",
            });
        }

        if (![30, 60].includes(duration)) {
            return res.status(400).json({
                success: false,
                message: "Duration must be either 30 or 60 minutes.",
            });
        }

        const meeting = await Meeting.findById(meeting_id);
        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: "Meeting not found.",
            });
        }

        meeting.time_slot = slot;
        meeting.duration = duration;

        const updatedMeeting = await meeting.save();

        res.status(200).json({
            success: true,
            message: "updated",
        });
    } catch (err) {
        console.error("Error updating meeting:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error. See logs for details.",
        });
    }
};


export const deleteMeeting = async (req, res) => {
    const { meeting_id } = req.params;

    try {
        const deletedMeeting = await Meeting.findByIdAndDelete(meeting_id);

        if (!deletedMeeting) {
            return res.status(404).json({
                success: false,
                message: "Meeting not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Meeting deleted successfully.",
        });
    } catch (err) {
        console.error("Error deleting meeting:", err.message);
        res.status(400).json({
            success: false,
            message: "Failed to delete meeting: " + err.message,
        });
    }
};

