import { IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: '사용자 ID' })
  @IsString()
  user_id: string;

  @ApiProperty({ description: '사용자 이름', required: false })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ description: '생년월일', required: false })
  @IsDateString()
  @IsOptional()
  birth_date?: string;

  @ApiProperty({ description: '주소', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: '전화번호', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: '이메일', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: '비밀번호', required: false })
  @IsString()
  @IsOptional()
  password?: string;
}
