import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { PendingUserDTO } from '@shared/DTO/SharedDTO';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
/**
 * * Class : RegisterController
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @class RegisterController
 * @param private readonly registerService: RegisterService
 * @description : /register 요청을 수행하는 회원가입 컨트롤러. 중복 여부를 판단, 그 후 회원가입을 수행할 수 있도록 한다.
 */
@Controller('register')
@ApiTags('Registration API')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @ApiOperation({
    summary: '회원가입',
    description:
      '사용자 회원가입 요청을 처리하는 엔드포인트이다. 중복 여부를 확인한 후 회원가입을 진행.',
  })
  async register(@Body() data: PendingUserDTO) {
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
