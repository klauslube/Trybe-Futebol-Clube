import { Request, Response } from 'express';
import { ITeamsWithMatches } from '../interfaces/ILeaderBoard';
import LeaderBoardService from '../services/LeaderBoardService';

export default class TeamController {
  constructor(private leaderBoardService:LeaderBoardService) { }

  public getAllWithMatchesHome = async (req: Request, res: Response) => {
    const allTeams = await this.leaderBoardService.getAllWithMatches();
    const allScores = await this.leaderBoardService.getHome(
      allTeams as unknown as ITeamsWithMatches[],
    );

    return res.status(200).json(allScores);
  };

  public getAllWithMatchesAway = async (req: Request, res: Response) => {
    const allTeams = await this.leaderBoardService.getAllWithMatches();
    const allScores = await this.leaderBoardService
      .getAway(allTeams as unknown as ITeamsWithMatches[]);

    return res.status(200).json(allScores);
  };

  public getAllHomeAway = async (req: Request, res: Response) => {
    const allTeams = await this.leaderBoardService.getAllWithMatches();
    const allScoresTotal = await this.leaderBoardService
      .getHomeAway(allTeams as unknown as ITeamsWithMatches[]);

    return res.status(200).json(allScoresTotal);
  };
}
