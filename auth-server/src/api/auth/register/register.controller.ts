import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterDataDTO } from '@shared/DTO/SharedDTO';
@Controller('register')
export class RegsiterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() data: RegisterDataDTO) {
    try {
      await this.registerService.register(data);
      return { message: '성공' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
