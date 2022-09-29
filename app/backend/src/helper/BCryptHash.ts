import { hashSync, compareSync } from 'bcryptjs';

export default class BcryptService {
  salt = 10;

  public encrypt(text: string): string {
    return hashSync(text, this.salt);
  }

  public compare = (encryptText: string, planText: string):boolean =>
    compareSync(planText, encryptText);
}
