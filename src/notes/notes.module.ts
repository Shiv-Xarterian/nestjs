import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { DatabaseService } from 'src/database/database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user.model';
import { NoteSchema } from 'src/models/note.schema';
import { Note } from 'src/models/note.model';

@Module({
  imports: [
    // Added the model as well as other services
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  controllers: [NotesController],
  providers: [NotesService, DatabaseService],
})
export class NotesModule {}
