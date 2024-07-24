import { Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';

@Controller('register')
export class AppController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  getHello(): string {
    return '';
  }
}
