import { verify, Secret } from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';
import CustomError from '../middlewares/CustomError';

export default function authToken(token:string):IUser {
  const { JWT_SECRET } = process.env || 'secret';
  try {
    const decoded = verify(token, JWT_SECRET as Secret);
    // console.log('decoded', decoded);

    return decoded as IUser;
  } catch (err) {
    console.log(err);
    throw new CustomError(401, 'Token must be a valid token');
  }
}
