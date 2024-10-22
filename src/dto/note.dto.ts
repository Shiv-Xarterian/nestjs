import { IsString } from 'class-validator';

export class NoteDao {
  @IsString()
  title: string;
}
