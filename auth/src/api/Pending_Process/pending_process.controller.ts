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
import { CancleService } from './cancle/cancle.service';

@Controller('/pending-process')
export class PendingProcessController {
  constructor(
    private readonly approveService: ApproveService,
    private readonly cancleService: CancleService,
  ) {}

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
  async cancleUser(@Body() data: PendingUserDTO) {
    try {
      const result = await this.cancleService.cancle(data);

      if (result) {
        return { message: '취소 성공' };
      } else {
        return { message: '취소 실패' };
      }
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Cancle User 실패',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
