import { IsString, IsEmail, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InsertUserDto {
  @ApiProperty({ description: '사용자 ID' })
  @IsString()
  user_id: string;

  @ApiProperty({ description: '사용자 이름' })
  @IsString()
  username: string;

  @ApiProperty({ description: '생년월일' })
  @IsDateString()
  birth_date: string;

  @ApiProperty({ description: '주소' })
  @IsString()
  address: string;

  @ApiProperty({ description: '전화번호' })
  @IsString()
  phone: string;

  @ApiProperty({ description: '이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  password: string;
}
