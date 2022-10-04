import { Request, Response } from 'express';
import { ILeaderboard } from '../interfaces/ILeaderBoard';
import LeaderBoardService from '../services/LeaderBoardService';

export default class TeamController {
  constructor(private leaderBoardService:LeaderBoardService) { }

  public getAllWithMatches = async (req: Request, res: Response) => {
    const allTeams = await this.leaderBoardService.getAllWithMatches();
    const allScores = await this.leaderBoardService.getHome(allTeams as unknown as ILeaderboard[]);

    return res.status(200).json(allScores);
  };
}
