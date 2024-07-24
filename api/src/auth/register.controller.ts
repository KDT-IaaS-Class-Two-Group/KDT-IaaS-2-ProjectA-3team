import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserInterface } from '@shared/DTO/SharedDTO';
@Controller('register')
export class RegsiterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() data: CreateUserInterface) {
    try {
      await this.registerService.registerUser(data);
      return { message: '성공' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
