import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegisterService } from '../register.service';
import { PendingUserDTO } from '@shared/DTO/SharedDTO';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

/**
 * @class RegisterController
 * @description 회원가입 요청을 처리하는 컨트롤러입니다. 사용자 등록을 관리하고, 중복 여부를 판단하여 회원가입을 진행합니다.
 *
 *  * 작성자 : @naviadev / 2024-08-08
 *  * 편집자 : @zoeznm / 2024-08-30
 *
 * 이 클래스는 `/register` 엔드포인트에 대한 요청을 처리합니다. 사용자의 데이터 유효성을 검사한 후, `RegisterService`를 호출하여 사용자 등록을 수행합니다.
 *
 * @param {RegisterService} registerService - 사용자 등록을 처리하는 서비스 객체입니다.
 *
 * @example
 * // 컨트롤러를 사용하여 회원가입 요청을 보냅니다.
 * const registerController = new RegisterController(registerService);
 * const response = await registerController.register({ user_id: 'example', ... });
 * console.log(response.message); // '성공'
 */
@Controller('register')
@ApiTags('Registration API') // 'Registration API'라는 태그로 이 컨트롤러의 엔드포인트를 그룹화합니다.
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @ApiOperation({
    summary: '회원가입',
    description:
      '사용자 회원가입 요청을 처리하는 엔드포인트입니다. 중복 여부를 확인한 후 회원가입을 진행합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    schema: {
      example: { message: '성공' },
    },
  })
  @ApiResponse({
    status: 400,
    description: '잘못된 요청 데이터',
    schema: {
      example: {
        statusCode: 400,
        message: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
    schema: {
      example: {
        statusCode: 500,
        message: 'Server Error',
      },
    },
  })

  /**
   * @function register
   * @description 사용자 회원가입 요청을 처리합니다. 중복 여부를 확인하고, 회원가입을 진행합니다.
   *
   * @param {PendingUserDTO} data - 회원가입에 필요한 사용자 데이터입니다.
   *
   * @returns {Promise<{ message: string }>} 성공적으로 회원가입이 처리된 경우 반환되는 메시지 객체입니다.
   *
   * @throws {HttpException} 잘못된 요청 데이터나 서버 에러 발생 시 예외를 발생시킵니다.
   *
   * @example
   * const data = { user_id: 'example', ... };
   * const response = await registerController.register(data);
   * console.log(response.message); // '성공'
   */
  async register(@Body() data: PendingUserDTO): Promise<{ message: string }> {
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
