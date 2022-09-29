import ILogin from '../interfaces/ILogin';
import User from '../database/models/User';

export default class UserRepository {
  userModel = User;
  async findOne(userData:ILogin) {
    const user = await this.userModel.findOne({ where: { email: userData.email }, raw: true });

    return user;
  }
}
