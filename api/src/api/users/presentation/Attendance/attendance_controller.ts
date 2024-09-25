import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { QueryBuilder } from 'src/database/infrastructure/queryBuilder';
import { ClockInDto } from './dto/clock_in.dto';
import { ClockOutDto } from './dto/clock_out.dto';

@Controller('/attendance')
export class AttendanceController {
  constructor(private readonly queryBuilder: QueryBuilder) {}

  @Post('/clockin')
  async clockIn(@Body() body: ClockInDto): Promise<any> {
    const { userId } = body;
    const now = new Date();

    try {
      await this.queryBuilder
        .INSERT('work_table', {
          user_id: userId,
          startTime: now,
        })
        .execution();

      return { message: 'Clock-in successful.' };
    } catch (error) {
      console.error('Clock-in error:', error);
      throw new HttpException(
        'Clock-in failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/clockout')
  async clockOut(@Body() body: ClockOutDto): Promise<any> {
    const { userId } = body;
    console.log('Received userId:', userId); // 서버에서 받은 userId를 로그로 출력

    const now = new Date();

    try {
      const result = await this.queryBuilder
        .LIstUP(
          'work_table',
          { endTime: now },
          'user_id = $1 AND endTime IS NULL', // $2 대신 $1로 수정
          [userId],
        )
        .execution();

      console.log('Update result:', result);

      if (result.length === 0) {
        return { message: 'No clock-in record found or already clocked out.' };
      }

      return { message: 'Clock-out successful.', result };
    } catch (error) {
      console.error('Clock-out error:', error);
      throw new HttpException(
        'Clock-out failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/random')
  async getRandomAttendanceRecords(): Promise<any> {
    const records = await this.queryBuilder
      .SELECT('work_table', [
        'work_table."user_id"',
        'users."username"',
        'work_table."startTime" AS clockInTime',
        'work_table."endTime" AS clockOutTime',
      ])
      .JOIN('users', 'work_table."user_id" = users."user_id"')
      .ORDER_BY('RANDOM()')
      .LIMIT(3)
      .execution();

    return records;
  }
}
