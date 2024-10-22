import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class jwtService {
  async generateToken(_id: string) {
    try {
      const payload = { _id };
      const token = jwt.sign(payload, process.env.Secret);
      return token;
    } catch (error) {
      throw error;
    }
  }

  async getTokenData(token: string) {
    try {
      const tokenData: jwt.JwtPayload = jwt.decode(token) as jwt.JwtPayload;
      return tokenData._id;
    } catch (error) {
      throw error;
    }
  }
}
