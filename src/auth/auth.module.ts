import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseService } from 'src/database/database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/models/user.model';
import { UserSchema } from 'src/models/user.schema';
import { Note } from 'src/models/note.model';
import { NoteSchema } from 'src/models/note.schema';
import { BcryptService } from './bcrypt.service';
import { jwtService } from './jwt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    //Dependency Injection - Models
  ],
  providers: [AuthService, DatabaseService, BcryptService, jwtService],
  controllers: [AuthController],
})
export class AuthModule {}
