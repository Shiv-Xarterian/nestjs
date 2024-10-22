import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { DatabaseModule } from './database/database.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { DatabaseService } from './database/database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './models/user.model';
import { UserSchema } from './models/user.schema';
import { NoteSchema } from './models/note.schema';
import { Note } from './models/note.model';
import { BcryptService } from './auth/bcrypt.service';
import { jwtService } from './auth/jwt.service';
import { AuthMiddleware } from './middleware/authenticate.middleware';

@Module({
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AuthService,
    DatabaseService,
    BcryptService,
    jwtService,
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.DATABASE_URL,
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Note.name, schema: NoteSchema },
    ]),
    DatabaseModule,
    AuthModule,
    NotesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('notes');
  }
}
