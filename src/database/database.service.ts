import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { Note } from '../models/note.model'; // Adjust path if necessary
import { LoginRequest, RegisterRequest } from 'src/dto/user.dto';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Note.name) private noteModel: Model<Note>,
  ) {}

  async login(data: LoginRequest): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ email: data.email });

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async createUser(user: RegisterRequest): Promise<User> {
    try {
      const newUser = await this.userModel.create(user);
      return newUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createNote(data: Note): Promise<Note> {
    const newNote = new this.noteModel(data);
    return newNote.save();
  }
}
