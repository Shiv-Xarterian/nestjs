import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { LoginRequest, LoginResponse, RegisterRequest } from 'src/dto/user.dto';
import { User } from 'src/models/user.model';
import { BcryptService } from './bcrypt.service';
import { jwtService } from './jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserDao: DatabaseService,
    private readonly Bcrypt: BcryptService,
    private readonly Jwt: jwtService,
  ) {}
  // Dataservice is called , so add it to auth module and also add model as well to show case dependency

  async loginUser(data: LoginRequest): Promise<LoginResponse> {
    try {
      const user = await this.UserDao.login(data);
      if (!user) throw new HttpException('No UserFound', HttpStatus.NOT_FOUND);
      const isvalidPassword = await this.Bcrypt.validatePassword(
        data.password,
        user.password,
      );

      if (!isvalidPassword)
        throw new HttpException('Wrong Password', HttpStatus.CONFLICT);

      const jwtToken = await this.Jwt.generateToken(user._id.toString());

      return {
        Token: jwtToken,
        User: user,
      };
    } catch (error) {
      throw error;
    }
  }

  async registerUser(data: RegisterRequest): Promise<User> {
    try {
      const user = await this.UserDao.login(data);
      if (user)
        throw new HttpException('User Already Exists', HttpStatus.CONFLICT);
      const Hashedpassword = await this.Bcrypt.hashPassword(data.password);
      data.password = Hashedpassword;
      const newUser = await this.UserDao.createUser(data);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}
