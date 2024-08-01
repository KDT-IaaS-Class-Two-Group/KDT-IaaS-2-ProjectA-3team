import { Module, MiddlewareConsumer } from '@nestjs/common';

import { LoggingMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
