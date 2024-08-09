import {
  IsString,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

/**
 * * Class : UsersDTO
 * 작성자 : @naviadev / 2024-08-04
 * 편집자 : @naviadev / 2024-08-08
 * Issue :
 * @class UsersDTO
 * @description : Users Table 객체
 */
export class UsersDTO {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsDateString()
  birth_date: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
