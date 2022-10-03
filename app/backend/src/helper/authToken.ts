import * as jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';
import CustomError from '../middlewares/CustomError';

export default function authToken(token:string):IUser {
  const { JWT_SECRET } = process.env || 'secret';
  try {
    const decoded = jwt.verify(token, JWT_SECRET as jwt.Secret);

    return decoded as IUser;
  } catch (err) {
    console.log(err);
    throw new CustomError(401, 'Token must be a valid token');
  }
}
