import { Router } from 'express';
import MatchRepository from '../repositories/MatchRepository';
import MatchService from '../services/MatchService';
import MatchController from '../controller/MatchController';
import TeamRepository from '../repositories/TeamRepository';

const router = Router();
const matchRepository = new MatchRepository();
const teamRepository = new TeamRepository();
const matchService = new MatchService(matchRepository, teamRepository);
const matchController = new MatchController(matchService);

router.get('/matches', matchController.getAllInProgress);
router.get('/matches', matchController.getAll);
router.post('/matches', matchController.createMatch);
router.patch('/matches/:id/finish', matchController.updateMatch);
router.patch('/matches/:id', matchController.updateMatchGoals);
export default router;
