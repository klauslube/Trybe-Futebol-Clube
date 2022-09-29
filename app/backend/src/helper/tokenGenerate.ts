import { SignOptions, sign, Secret } from 'jsonwebtoken';

const jwtConfig:SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const { JWT_SECRET } = process.env || 'secret';

export default async function tokenGenerate(payload: object) {
  const token = sign(payload, JWT_SECRET as Secret, jwtConfig);
  return token;
}
