import { Router } from 'express';
import TeamRepository from '../repositories/TeamRepository';
import LeaderBoardService from '../services/LeaderBoardService';
import LeaderBoardController from '../controller/LeaderBoardController';

const router = Router();
const teamRepository = new TeamRepository();
const leaderBoardService = new LeaderBoardService(teamRepository);
const leaderBoardController = new LeaderBoardController(leaderBoardService);

router.get('/leaderboard/home', leaderBoardController.getAllWithMatchesHome);
router.get('/leaderboard/away', leaderBoardController.getAllWithMatchesAway);
router.get('/leaderboard', leaderBoardController.getAllHomeAway);

export default router;
