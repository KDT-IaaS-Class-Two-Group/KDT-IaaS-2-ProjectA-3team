import { Module, MiddlewareConsumer } from '@nestjs/common';

import { LoggingMiddleware } from './logger.middleware';
import { AuthModule } from './auth.module';

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
