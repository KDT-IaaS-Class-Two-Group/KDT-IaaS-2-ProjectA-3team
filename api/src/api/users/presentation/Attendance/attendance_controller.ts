import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
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
          user_id: userId, // 정확한 컬럼명 'user_id' 사용
          startTime: now, // 정확한 컬럼명 'startTime' 사용
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
          { endTime: now }, // 정확한 컬럼명 'endTime' 사용
          'user_id = $2 AND "endTime" IS NULL', // 매개변수 인덱스를 $2로 변경
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
}
