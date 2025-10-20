import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { JwtStrategy } from './auth/jwt.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtGuard } from './auth/jwt.guard'
import { CourseModule } from './course/course.module'
import { StudentModule } from './student/student.module'
import { AttendanceModule } from './attendance/attendance.module'
import { HelloModule } from './hello/hello.module'
import { DecksModule } from './decks/decks.module'
import { FlashcardsModule } from './flashcards/flashcards.module';
import { ExamplesModule } from './examples/examples.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    CourseModule,
    StudentModule,
    AttendanceModule,
    HelloModule,
    DecksModule,
    FlashcardsModule,
    ExamplesModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtGuard },
    JwtStrategy,
  ],
})
export class AppModule {}
