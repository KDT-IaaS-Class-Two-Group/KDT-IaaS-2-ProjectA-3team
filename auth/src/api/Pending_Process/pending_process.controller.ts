import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApproveService } from './approve/approve.service';
import { PendingUserDTO } from '../auth/register/DTO/PendingUserDTO';

@Controller('/pending-process')
export class PendingProcessController {
  constructor(private readonly approveService: ApproveService) {}

  @Post('/approve')
  @HttpCode(200)
  async approveUser(@Body() data: PendingUserDTO) {
    try {
      const approveResult = this.approveService.approve(data);
      if (approveResult) {
        return { message: '승인 성공' };
      } else {
        return { message: '승인 실패' };
      }
    } catch (error) {
      console.error('ApproveUser 에러 : ', error);
      throw new HttpException(
        'Approve User 실패',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/cancle')
  cancleUser() {}
}
