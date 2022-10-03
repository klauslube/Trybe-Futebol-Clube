import { Response, Request } from 'express';
import authToken from '../helper/authToken';
import CustomError from '../middlewares/CustomError';

import UserService from '../services/UserService';

export default class LoginController {
  constructor(private loginService:UserService) {}

  public login = async (req: Request, res: Response) => {
    const userData = req.body;

    const token = await this.loginService.login(userData);

    return res.status(200).json(token);
  };

  public validate = async (req:Request, res:Response) => {
    const { authorization } = req.headers;
    if (!authorization) throw new CustomError(401, 'Token must be a valid token');

    const userRole = authToken(authorization);
    console.log(userRole);

    return res.status(200).json({ role: userRole.role });
  };
}
