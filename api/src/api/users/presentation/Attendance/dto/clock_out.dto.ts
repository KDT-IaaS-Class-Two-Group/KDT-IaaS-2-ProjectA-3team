import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClockOutDto {
  @ApiProperty({ description: '사용자 ID' })
  @IsString()
  userId: string;
}
