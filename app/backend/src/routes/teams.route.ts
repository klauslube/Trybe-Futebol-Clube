import { Router } from 'express';
import TeamRepository from '../repositories/TeamRepository';
import TeamService from '../services/TeamService';
import TeamController from '../controller/TeamController';

const router = Router();
const teamRepository = new TeamRepository();
const teamService = new TeamService(teamRepository);
const teamController = new TeamController(teamService);

router.get('/teams', teamController.getAll);

export default router;
