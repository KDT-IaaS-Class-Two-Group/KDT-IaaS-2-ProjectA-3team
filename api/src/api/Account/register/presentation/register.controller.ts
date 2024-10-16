// import {
//   Body,
//   Controller,
//   Post,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { RegisterService } from './register.service';
// import { PendingUserDTO } from '@shared/DTO/SharedDTO';
// /**
//  * * Class : RegisterController
//  * 작성자 : @naviadev / 2024-07-31
//  * 편집자 : @naviadev / 2024-08-08
//  * Issue :
//  * @class RegisterController
//  * @param private readonly registerService: RegisterService
//  * @description : /register 요청을 수행하는 회원가입 컨트롤러. 중복 여부를 판단, 그 후 회원가입을 수행할 수 있도록 한다.
//  */
// @Controller('register')
// export class RegisterController {
//   constructor(private readonly registerService: RegisterService) {}

//   @Post()
//   async register(@Body() data: PendingUserDTO) {
//     try {
//       await this.registerService.register(data);
//       return { message: '성공' };
//     } catch (error) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }
// }
