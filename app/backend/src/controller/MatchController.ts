import { Response, Request, NextFunction } from 'express';
import MatchService from '../services/MatchService';
import CustomError from '../middlewares/CustomError';

export default class TeamController {
  constructor(private matchService:MatchService) { }

  public getAll = async (req: Request, res: Response) => {
    const allMatches = await this.matchService.getAll();

    return res.status(200).json(allMatches);
  };

  public getAllInProgress = async (req: Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;
    if (!inProgress) return next();

    const allMatches = await this.matchService.getAllInProgress(inProgress === 'true');

    return res.status(200).json(allMatches);
  };

  public createMatch = async (req:Request, res:Response) => {
    const matchData = req.body;
    const { authorization } = req.headers;
    if (!authorization) throw new CustomError(401, 'Token not found');

    const newMatch = await this.matchService.createMatch(matchData, authorization);

    return res.status(201).json(newMatch);
  };

  public updateMatch = async (req:Request, res:Response) => {
    const { id } = req.params;
    if (!id) throw new CustomError(401, 'Id not found');

    await this.matchService.updateMatch(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatchGoals = async (req:Request, res:Response) => {
    const { id } = req.params;
    const matchGoals = req.body;
    if (!id) throw new CustomError(401, 'Id not found');

    await this.matchService.updateMatchGoals(Number(id), matchGoals);

    return res.status(200).json({ message: 'Match Goals updated' });
  };
}
