import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PendingUserDTO {
  @ApiProperty({
    description: '대기중인 사용자의 ID',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  readonly user_id: string;
}
