import {
  Controller,
  Get,
  Req,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { GetUserRoleDto } from './dto/user_role.dto';

@Controller('/user')
export class UserRoleController {
  constructor(private readonly queryBuilder: QueryBuilder) {}

  private role_users = ['user_id'];

  @Get('/role')
  async getUserRole(
    @Req() req: Request,
    @Query() query: GetUserRoleDto,
  ): Promise<any> {
    const userId = req.session.user?.user_id || query.userId;

    if (!userId) {
      throw new HttpException(
        'User not logged in or session expired',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const roleTables = [
      'admin_role_users',
      'leader_role_users',
      'sub_admin_role_users',
      'employee_role_users',
    ];

    const role = await this.findUserRole(userId, roleTables);
    if (role) {
      return { role };
    }

    throw new HttpException('Role not found for user', HttpStatus.NOT_FOUND);
  }

  private async findUserRole(
    userId: string,
    roleTables: string[],
  ): Promise<string | null> {
    for (const table of roleTables) {
      const roleQuery = await this.queryBuilder
        .SELECT(table, ['role_name'])
        .WHERE('user_id = $1', [userId])
        .execution();

      if (roleQuery.length > 0) {
        return roleQuery[0].role_name;
      }
    }
    return null;
  }

  @Get('/leaders')
  async CheckLeaders(): Promise<any> {
    const obj = await this.queryBuilder
      .SELECT('leader_role_users', this.role_users)
      .execution();
    return obj;
  }

  @Get('/members')
  async CheckMembers(): Promise<any> {
    const obj = await this.queryBuilder
      .SELECT('employee_role_users', this.role_users)
      .execution();
    return obj;
  }
}
