import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterService } from './register.service';
import { PendingUserDTO } from './DTO/PendingUserDTO';

/**
 * * Class : RegisterController
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-08-04
 * Issue :
 * @class RegisterController
 * @param private readonly registerService: RegisterService
 * @description : /register 요청을 수행하는 회원가입 컨트롤러. 중복 여부를 판단, 그 후 회원가입을 수행할 수 있도록 한다.
 */
@ApiTags('회원가입 엔드포인트')
@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @ApiOperation({ summary: '회원가입 엔드포인트' })
  @ApiBody({
    description: '사용자 데이터',
    type: PendingUserDTO,
  })
  @ApiResponse({
    status: 201,
    description: '회원가입 성곡',
    schema: {
      example: {
        message: '성공',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 데이터',
  })
  @ApiResponse({
    status: 500,
    description: '데이터베이스 에러 or 서버 에러',
  })
  async register(@Body() data: PendingUserDTO) {
    try {
      await this.registerService.register(data);
      return { message: '성공' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('서버 에러', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
