import { Response, Request } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService:TeamService) { }

  public getAll = async (req: Request, res: Response) => {
    const allTeams = await this.teamService.getAll();

    return res.status(200).json(allTeams);
  };

  public getById = async (req: Request, res: Response) => {
    const team = await this.teamService.getById(Number(req.params.id));

    return res.status(200).json(team);
  };
}
