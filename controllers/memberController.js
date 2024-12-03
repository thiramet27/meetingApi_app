import teamMember from '../models/teammemberModel.js';

export const get_team_member = async (req, res) => {
    const { manager_id } = req.params;

    try {
        const teamMembers = await teamMember.find({managerId: manager_id});
        if (teamMembers.length === 0){
            return res.status(400).json({
                success: false, message: "Can't empty memberId nakub."
            })
        }
        res.status(200).json(teamMembers);
    } catch(err){
        res.status(400).json({
            success: false, message:err.message
        });
    }
};