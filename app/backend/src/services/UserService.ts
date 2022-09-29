import ILogin from '../interfaces/ILogin';
import tokenGenerate from '../helper/tokenGenerate';
import CustomError from '../middlewares/CustomError';
import UserRepository from '../repositories/UserRepository';
import IHash from '../interfaces/IHash';

export default class UserService {
  constructor(private userModel:UserRepository, private bcrypt:IHash) { }

  async login(userData:ILogin) {
    const userLogin = await this.userModel.findOne(userData);
    console.log(userLogin);
    // if (!userData.email || !userData.password) {
    // throw new CustomError(400, 'All fields must be filled"');
    // }
    if (!userLogin) throw new CustomError(401, 'Incorrect email or password');
    const passwordValid = this.bcrypt.compare(userLogin.password, userData.password);
    if (!passwordValid || userLogin.email !== userData.email) {
      throw new CustomError(401, 'Incorrect email or password');
    }
    const token = await tokenGenerate({ userData });
    return { token };
  }
}
