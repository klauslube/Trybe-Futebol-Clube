import ILogin from '../interfaces/ILogin';
import tokenGenerate from '../helper/tokenGenerate';
import CustomError from '../middlewares/CustomError';
import UserRepository from '../repositories/UserRepository';

export default class UserService {
  constructor(private userModel:UserRepository) { }

  async login(userData:ILogin) {
    const userLogin = await this.userModel.findOne(userData);
    if (!userLogin) throw new CustomError(400, 'All fields must be filled"');
    if (userLogin.password !== userData.password || userLogin.email !== userData.email) {
      throw new CustomError(401, 'Incorrect email or password');
    }
    const token = await tokenGenerate({ userData });
    return { token };
  }
}
