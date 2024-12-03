import express from 'express';
import { get_team_member,
    createTeamMember,
    deleteTeamMember,
    get_all_team_members } from '../controllers/memberController.js';

const router = express.Router();

router.get('/:manager_Id',get_team_member);
router.post('/',createTeamMember);
router.delete('/:id',deleteTeamMember);
router.get('/',get_all_team_members);

export default router;