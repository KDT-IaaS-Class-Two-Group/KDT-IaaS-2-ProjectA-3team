import {
  Controller,
  Post,
  Body,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { InsertUserDto } from './dto/user_controller.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { AcceptChangesDto } from './dto/user_change.dto';
import { RejectChangesDto } from './dto/user_reject.dto';

@Controller('/user')
export class UserManagementController {
  constructor(private readonly queryBuilder: QueryBuilder) {}

  @Post('/insert')
  async insertUser(@Body() data: InsertUserDto): Promise<any> {
    const { username, birth_date, address, phone, email, password, user_id } =
      data;
    if (!user_id || !username || !password) {
      throw new HttpException(
        'User ID, username, and password are required.',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      await this.queryBuilder
        .INSERT('checkusers', {
          username,
          birth_date,
          address,
          phone,
          email,
          password,
          user_id,
        })
        .execution();
      return { message: 'User added successfully.' };
    } catch (error) {
      console.error('Error adding user:', error);
      throw new HttpException(
        'Failed to add user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/update')
  async updateUser(@Body() data: UpdateUserDto): Promise<any> {
    const { user_id, ...fields } = data;
    if (!user_id) {
      throw new HttpException('User ID is required.', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.queryBuilder
        .UPDATE('checkusers', fields, 'user_id = $1')
        .execution();
      return { message: 'User information updated successfully.' };
    } catch (error) {
      console.error('Error updating user information:', error);
      throw new HttpException(
        'Failed to update user information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/accept')
  async acceptChanges(@Body() body: AcceptChangesDto): Promise<any> {
    const { user_id } = body;
    if (!user_id) {
      throw new HttpException('User ID is required.', HttpStatus.BAD_REQUEST);
    }
    try {
      const checkUser = await this.queryBuilder
        .SELECT('checkusers')
        .WHERE('user_id = $1', [user_id])
        .execution();

      if (checkUser.length === 0) {
        return { message: 'No changes to accept.' };
      }

      await this.queryBuilder
        .UPDATE(
          'users',
          {
            user_id: checkUser[0].user_id,
            username: checkUser[0].username,
            birth_date: checkUser[0].birth_date,
            address: checkUser[0].address,
            phone: checkUser[0].phone,
            email: checkUser[0].email,
            password: checkUser[0].password,
          },
          'user_id = $1',
        )
        .execution();

      await this.queryBuilder
        .DELETE('checkusers', 'user_id = $1', [user_id])
        .execution();

      return { message: 'User information updated successfully.' };
    } catch (error) {
      console.error('Error accepting changes:', error);
      throw new HttpException(
        'Failed to accept changes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/reject')
  async rejectChanges(@Body() body: RejectChangesDto): Promise<any> {
    const { user_id } = body;
    if (!user_id) {
      throw new HttpException('User ID is required.', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.queryBuilder
        .DELETE('checkusers', 'user_id = $1', [user_id])
        .execution();
      return { message: 'Change request rejected successfully.' };
    } catch (error) {
      console.error('Error rejecting change request:', error);
      throw new HttpException(
        'Failed to reject change request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
