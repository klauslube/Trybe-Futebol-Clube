import { Response, Request } from 'express';
import authToken from 'src/helper/authToken';
import CustomError from '../middlewares/CustomError';

import UserService from '../services/UserService';

export default class LoginController {
  constructor(private loginService:UserService) {}

  public login = async (req: Request, res: Response) => {
    const userData = req.body;

    const checkUser = await this.loginService.login(userData);

    return res.status(200).json(checkUser);
  };

  public validate = async (req:Request, res:Response) => {
    const { authorization } = req.headers;
    if (!authorization) throw new CustomError(401, 'Token not found');

    const payload = authToken(authorization);
    const roleLogin = await this.loginService.validate();
    return res.status(200).json(roleLogin);
  };
}
