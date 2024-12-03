import teamMember from '../models/teammemberModel.js';
//get member
export const get_team_member = async (req, res) => {
    const { manager_Id,name,position } = req.params;

    try {
        const teamMembers = await teamMember.find({ manager_Id: manager_Id });
        if (teamMembers.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Can't find this memberId nakub.",
            });
        }
        const response = teamMembers.map(member => ({
            id: member._id,
            name: member.name,
            position: member.position,
        }));

        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
//craete
export const createTeamMember = async (req, res) => {
    const { manager_Id, name, position ,staff_id } = req.body;

    try {
        const existingMember = await teamMember.findOne({ staff_id });

        if (existingMember) {
            return res.status(400).json({
                success: false,
                message: "A team member with this manager_id already exists.",
            });
        }

        const newTeamMember = new teamMember({ manager_Id, name, position ,staff_id});
        const savedTeamMember = await newTeamMember.save();

        res.status(201).json({
            success: true,
            message: "Team member created successfully.",
            teamMember: savedTeamMember,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
//getall
export const get_all_team_members = async (req, res) => {
    try {
        const teamMembers = await teamMember.find();
        if (teamMembers.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No team members found.",
            });
        }
        
        const response = teamMembers.map(member => ({
            id: member._id,
            manager_Id:member.manager_Id,
            name: member.name,
            position: member.position,
            staff_id: member.staff_id,
        }));

        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({
            success: false, 
            message: err.message,
        });
    }
};
//delete
export const deleteTeamMember = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMember = await teamMember.findByIdAndDelete(id);
        if (!deletedMember) {
            return res.status(404).json({
                success: false,
                message: "Team member not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Team member deleted successfully.",
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};