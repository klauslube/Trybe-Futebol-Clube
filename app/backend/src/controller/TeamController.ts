import { Response, Request } from 'express';
import TeamService from '../services/TeamService';

export default class LoginController {
  constructor(private teamService:TeamService) { }

  public getAll = async (req: Request, res: Response) => {
    const allTeams = await this.teamService.getAll();

    return res.status(200).json(allTeams);
  };
}
