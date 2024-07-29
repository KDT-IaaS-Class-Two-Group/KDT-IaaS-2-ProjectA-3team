import { Module, MiddlewareConsumer } from '@nestjs/common';

import { LoggingMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
