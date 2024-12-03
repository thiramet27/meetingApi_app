import express from 'express';
import { get_team_member } from '../controllers/memberController.js';

const router = express.Router();

/**
 * @swagger
 * /api/team-members/{manager_id}:
 *   get:
 *     summary: Get team members by manager ID
 *     description: Retrieve a list of team members for a given manager ID.
 *     parameters:
 *       - in: path
 *         name: manager_id
 *         required: true
 *         description: The ID of the manager whose team members you want to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of team members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   position:
 *                     type: string
 *       400:
 *         description: No team members found
 *       500:
 *         description: Server error
 */

router.get('/api/team-members/:manager_id',get_team_member);

export default router;