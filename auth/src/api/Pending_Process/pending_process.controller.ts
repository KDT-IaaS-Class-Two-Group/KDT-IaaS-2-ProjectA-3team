import { Body, Controller, Post } from '@nestjs/common';
import { ApproveService } from './approve/approve.service';
import { PendingUserDTO } from '../auth/register/DTO/PendingUserDTO';

@Controller('/pending-process')
export class PendingProcessController {
  constructor(private readonly approveService: ApproveService) {}

  @Post('/approve')
  async approveUser(@Body() data: PendingUserDTO) {}
  @Post('/cancle')
  cancleUser() {}
}
