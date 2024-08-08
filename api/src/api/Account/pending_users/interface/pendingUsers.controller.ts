import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CheckPendingUsers } from '../application/services/checkPendingUser';
import { SetDefalutRole } from '../application/services/setDefaultRole';
import { MigrationUserData } from '../application/services/migrationUserData';
import { DeleteUsers } from '../application/services/deleteUsers';
import { PendingUserDTO } from '../../common/infrastructure/DTO/pendingUsers';

import { RES_ERROR_MSG } from '../../common/enum/message/error/responseErrorMessage.enum';

@Controller('/pending-process')
export class PendingUsersController {
  constructor(
    private readonly checkPendingUsers: CheckPendingUsers,
    private readonly setDefaultRole: SetDefalutRole,
    private readonly migrationUserData: MigrationUserData,
    private readonly deleteUsers: DeleteUsers,
  ) {}

  @Post('/approve')
  @HttpCode(200)
  async approveUser(@Body() pendingUserData: PendingUserDTO) {
    const { user_id } = pendingUserData;

    // 데이터베이스에서 해당 유저를 체크하는 작업을 수행함과 동시에, 비밀번호를 가져온다.
    try {
      const checkUserData = await this.checkPendingUsers.check(user_id);
      await this.deleteUsers.deleteUser(user_id);
      await this.migrationUserData.migrationUserData(checkUserData);
      await this.setDefaultRole.setDefaultRole(user_id);
      return true;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        RES_ERROR_MSG.FAILED_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/cancel')
  @HttpCode(200)
  async cancleUser(@Body() pendingUserData: PendingUserDTO) {
    await this.deleteUsers.deleteUser(pendingUserData.user_id);
  }
}
