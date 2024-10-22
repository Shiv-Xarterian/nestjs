import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginRequest, RegisterRequest } from 'src/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Put('login')
  async login(@Body() data: LoginRequest, @Res() res: Response) {
    try {
      const user = await this.authService.loginUser(data);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  async register(@Body() data: RegisterRequest, @Res() res: Response) {
    try {
      const user = await this.authService.registerUser(data);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      throw new HttpException(
        error.message || 'INTERNAL_SERVER_ERROR',
        error.status || 500,
      );
    }
  }

  // @Get('allusers')
  // async getalluser(){
  //   try {

  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // @Post('register')
  // async register(@Body() data: RegisterRequest, @Res() res: Response) {
  //   try {
  //     const user = await this.authService.registerUser(data);
  //     return res.status(HttpStatus.OK).json(user);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.CONFLICT);
  //   }
  // }
}
