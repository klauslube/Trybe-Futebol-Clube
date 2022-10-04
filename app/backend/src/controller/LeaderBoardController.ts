import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class TeamController {
  constructor(private leaderBoardService:LeaderBoardService) { }

  public getAllWithMatches = async (req: Request, res: Response) => {
    const allTeams = await this.leaderBoardService.getAllWithMatches();

    return res.status(200).json(allTeams);
  };
}
