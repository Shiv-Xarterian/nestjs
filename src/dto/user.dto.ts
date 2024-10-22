import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { User } from 'src/models/user.model';

export class LoginRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResponse {
  @IsString()
  @IsNotEmpty()
  Token: string;

  @IsNotEmpty()
  User: User;
}
