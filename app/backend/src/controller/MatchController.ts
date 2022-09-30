import { Response, Request } from 'express';
import MatchService from '../services/MatchService';

export default class TeamController {
  constructor(private matchService:MatchService) { }

  public getAll = async (req: Request, res: Response) => {
    const allMatches = await this.matchService.getAll();

    return res.status(200).json(allMatches);
  };

  public getAllInProgress = async (req: Request, res: Response) => {
    const { q } = req.query;
    const allMatches = await this.matchService.getAllInProgress(q);

    return res.status(200).json(allMatches);
  };
}
