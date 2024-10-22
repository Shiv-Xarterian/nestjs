import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { jwtService } from 'src/auth/jwt.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: jwtService) {}
  use(req, res: Response, next: NextFunction) {
    const token = req.headers['token'];
    this.jwtService.getTokenData(token).then((out) => {
      console.log(out);
      req.id = out;
    });
    next();
  }
}
