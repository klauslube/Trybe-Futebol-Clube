// import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';
import { IUser } from '../interfaces/IUser';

export default class UserRepository {
  userModel = User;
  async findOne(userData:IUser) {
    const user = await this.userModel.findOne({ where: { email: userData.email }, raw: true });

    return user;
  }
}
