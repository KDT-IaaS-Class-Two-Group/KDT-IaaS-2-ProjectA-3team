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
    console.log('Session user:', req.session.user); // 세션에서 유저 정보 출력
    console.log('Query userId:', query.userId);
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
      console.log('User role found:', role);
      return { role };
    }
    console.log('Role not found for user, returning NOT FOUND');
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

  @Get('/roles') // 모든 역할을 가져오는 새로운 API
  async getAllRoles(): Promise<any> {
    console.log('Fetching all roles from role table');
    try {
      const rolesQuery = await this.queryBuilder
        .SELECT('role', ['role_name'])
        .execution();

      if (rolesQuery.length > 0) {
        console.log('Roles found:', rolesQuery);
        return rolesQuery;
      } else {
        console.log('No roles found in role table');
        throw new HttpException('No roles found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/leaders')
  async CheckLeaders(): Promise<any> {
    try {
      const obj = await this.queryBuilder
        .SELECT('leader_role_users', this.role_users)
        .execution();
      if (obj.length > 0) {
        return obj;
      } else {
        throw new HttpException('No leaders found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error('Error fetching leaders:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/members')
  async CheckMembers(): Promise<any> {
    try {
      const obj = await this.queryBuilder
        .SELECT('employee_role_users', this.role_users)
        .execution();
      if (obj.length > 0) {
        return obj;
      } else {
        throw new HttpException('No members found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
