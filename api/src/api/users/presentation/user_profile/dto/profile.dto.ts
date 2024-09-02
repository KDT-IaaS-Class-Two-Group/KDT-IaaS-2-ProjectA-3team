import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveProfileDto {
  @ApiProperty({ description: '사용자 ID' })
  @IsString()
  user_id: string;

  @ApiProperty({ description: '사용자 프로필 바이오', required: false })
  @IsString()
  @IsOptional()
  bio?: string;
}
