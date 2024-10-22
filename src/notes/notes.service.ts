import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Note } from 'src/models/note.model';

@Injectable()
export class NotesService {
  constructor(private readonly noteDao: DatabaseService) {}
  private notes = [
    {
      NoteId: 1,
      UserName: 'Shiv',
      Message: 'shiv-note-1',
    },
    {
      NoteId: 2,
      UserName: 'Shiv',
      Message: 'shiv-note-2',
    },
    {
      NoteId: 3,
      UserName: 'Shiv',
      Message: 'shiv-note-3',
    },
    {
      NoteId: 4,
      UserName: 'Aryan',
      Message: 'aryan-note-1',
    },
    {
      NoteId: 5,
      UserName: 'Aryan',
      Message: 'aryan-note-2',
    },
    {
      NoteId: 6,
      UserName: 'Ritik',
      Message: 'ritik-note-1',
    },
    {
      NoteId: 7,
      UserName: 'Ritik',
      Message: 'ritik-note-2',
    },
  ];

  getnotebyId(NoteId: number) {
    const note = this.notes.find((note) => {
      return note.NoteId === NoteId;
    });
    return note;
  }

  async createNote(data: Note): Promise<Note> {
    try {
      const note = await this.noteDao.createNote(data);
      return note;
    } catch (error) {
      throw error;
    }
  }
}
