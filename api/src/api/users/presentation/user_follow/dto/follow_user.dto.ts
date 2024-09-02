import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FollowUserDto {
  @ApiProperty({ description: '팔로우할 사용자의 ID' })
  @IsString()
  followingId: string;
}
