import { verify } from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';
import CustomError from '../middlewares/CustomError';

export default function authToken(token:string):ILogin {
  const JWT_SECRET = 'secret';
  try {
    const decoded = verify(token, JWT_SECRET);
    return decoded as ILogin;
  } catch (err) {
    console.log(err);
    throw new CustomError(401, 'Invalid token');
  }
}
