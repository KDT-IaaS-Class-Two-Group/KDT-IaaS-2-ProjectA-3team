import { IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export interface SessionDTO {
  user_id: string;
  role_name: string;
}

export interface LoginDTO {
  user_id: string;
  password: string;
}
export interface ResponseJson {
  status: string;
  redirect: string;
  role: string;
}

export interface UserInterface {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  // role_name: string;
  // salary: number;
  // field_name: string;
}

export class UserDTO {
  @ApiProperty({ description: '회원 ID' })
  @IsString()
  readonly user_id: string;

  @ApiProperty({ description: '회원 이름' })
  @IsString()
  readonly user_name: string;
  @ApiProperty({ description: '회원 생년월일' })
  @IsString()
  readonly birth_date: string;
  @ApiProperty({ description: '회원 주소' })
  @IsString()
  readonly address: string;
  @ApiProperty({ description: '회원 전화번호 010-nnnn-nnn' })
  @IsString()
  readonly phone: string;
  @ApiProperty({ description: '회원 이메일' })
  @IsString()
  readonly email: string;
  @ApiProperty({ description: '회원 비밀번호' })
  @IsString()
  readonly password: string;
}



export interface PendingUserDTO {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}
