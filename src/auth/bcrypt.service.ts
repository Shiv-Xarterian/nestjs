import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async hashPassword(password: string) {
    try {
      const hashPassword = await bcrypt.hashSync(password, 10);
      return hashPassword;
    } catch (error) {
      throw error;
    }
  }

  async validatePassword(password: string, hashPassword: string) {
    try {
      const valid = await bcrypt.compare(password, hashPassword);
      return valid;
    } catch (error) {
      throw error;
    }
  }
}
