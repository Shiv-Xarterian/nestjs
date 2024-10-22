import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Response } from 'express';
import { Note } from 'src/models/note.model';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get(':id')
  getallnotes(
    @Param('id', ParseIntPipe) NoteId: number,
    @Req() req,
    @Res() res: Response,
  ) {
    const note = this.noteService.getnotebyId(NoteId);
    if (!note) throw new HttpException('No Note Found', HttpStatus.NOT_FOUND);
    return res.status(200).json(note);
  }

  @Post()
  async createnote(
    @Body('title') title: string,
    @Body('message') message: string,
    @Res() res: Response,
  ) {
    try {
      const note = await this.noteService.createNote({
        title,
        message,
      } as Note);
      return res.status(HttpStatus.OK).json(note);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
