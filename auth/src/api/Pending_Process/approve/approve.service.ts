import { Injectable } from '@nestjs/common';
import { PendingUserDTO } from 'src/api/auth/register/DTO/PendingUserDTO';
import { QueryBuilder } from 'src/database/queryBuilder';

@Injectable()
export class ApproveService {
  private pendingTableName = 'pending_users';
  private usersTableName = 'users';
  private defaultRoleTable = 'employee_role_users';

  constructor(private readonly queryBuilder: QueryBuilder) {}

  private async CheckPendingTable(user_id: string) {
    try {
      const PendingData = await this.queryBuilder
        .SELECT(this.pendingTableName)
        .WHERE('user_id = $1', user_id)
        .execution();
      return PendingData[0];
    } catch (error) {
      console.error('PendingUserDatabase Search Error', error);
      throw new Error('사용자 검증 실패');
    }
  }

  private async MigrationUserData(data: PendingUserDTO) {
    try {
      await this.queryBuilder
        .INSERT(this.usersTableName, {
          user_id: data.user_id,
          username: data.username,
          birth_date: data.birth_date,
          address: data.address,
          phone: data.phone,
          email: data.email,
          password: data.password,
        })
        .execution();
      console.log('승인 성공');
      return true;
    } catch (error) {
      console.error('Migration 실패', error);
      return false;
    }
  }

  private async setDefaultRole(user_id: string) {
    try {
      await this.queryBuilder
        .INSERT(this.defaultRoleTable, {
          user_id: user_id,
          role_name: 'employee',
        })
        .execution();
      return true;
    } catch (error) {
      console.error('권한 추가 실패 : ', error);
      return false;
    }
  }
  private async deletePendingUser(user_id: string) {
    try {
      await this.queryBuilder
        .DELETE(this.pendingTableName, 'user_id = $1', user_id)
        .execution();
      return true;
    } catch (error) {
      console.error('삭제 실패 : ', error);
      return false;
    }
  }

  async approve(data: PendingUserDTO) {
    try {
      const userData = await this.CheckPendingTable(data.user_id);
      const result = await this.MigrationUserData(userData);
      if (result) {
        const setRoleResult = this.setDefaultRole(data.user_id);
        this.deletePendingUser(data.user_id);
        return setRoleResult;
      } else {
        console.log('Migration 실패');
        return false;
      }
    } catch (error) {
      console.error('Approve 실패', error);
      throw new Error('Approve Failed');
    }
  }
}
