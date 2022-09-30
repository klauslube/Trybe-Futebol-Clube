import { Response, Request, NextFunction } from 'express';
import MatchService from '../services/MatchService';

export default class TeamController {
  constructor(private matchService:MatchService) { }

  public getAll = async (req: Request, res: Response) => {
    const allMatches = await this.matchService.getAll();

    return res.status(200).json(allMatches);
  };

  public getAllInProgress = async (req: Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;
    console.log(req.query);
    if (!inProgress) return next();

    const allMatches = await this.matchService.getAllInProgress(inProgress === 'true');

    return res.status(200).json(allMatches);
  };
}
