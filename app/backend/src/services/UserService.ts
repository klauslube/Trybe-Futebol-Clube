import tokenGenerate from '../helper/tokenGenerate';
import CustomError from '../middlewares/CustomError';
import UserRepository from '../repositories/UserRepository';
import IHash from '../interfaces/IHash';
import { IUser } from '../interfaces/IUser';

export default class UserService {
  constructor(private userModel:UserRepository, private bcrypt:IHash) { }

  async login(userData:IUser) {
    if (!userData.email || !userData.password) {
      throw new CustomError(400, 'All fields must be filled');
    }
    const userLogin = await this.userModel.findOne(userData);
    if (!userLogin) throw new CustomError(401, 'Incorrect email or password');
    const passwordValid = this.bcrypt.compare(userLogin.password, userData.password);
    if (!passwordValid || userLogin.email !== userData.email) {
      throw new CustomError(401, 'Incorrect email or password');
    }
    const token = await tokenGenerate(userLogin);
    return { token };
  }
}
