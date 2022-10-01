import { Router } from 'express';
import MatchRepository from '../repositories/MatchRepository';
import MatchService from '../services/MatchService';
import MatchController from '../controller/MatchController';

const router = Router();
const matchRepository = new MatchRepository();
const matchService = new MatchService(matchRepository);
const matchController = new MatchController(matchService);

router.get('/matches', matchController.getAllInProgress);
router.get('/matches', matchController.getAll);
router.post('/matches', matchController.createMatch);
router.patch('/matches/:id/finish', matchController.updateMatch);
export default router;
