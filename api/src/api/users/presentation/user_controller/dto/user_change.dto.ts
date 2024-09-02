import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AcceptChangesDto {
  @ApiProperty({ description: '사용자 ID' })
  @IsString()
  user_id: string;
}
