import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @class UserDTO
 * @brief 회원 정보를 담는 DTO.
 */
export class UserDTO {
  /**
   * @brief 회원 ID.
   * @example 'user123'
   */
  @ApiProperty({ description: '회원 ID' })
  @IsString()
  readonly user_id: string;

  /**
   * @brief 회원 이름.
   * @example '홍길동'
   */
  @ApiProperty({ description: '회원 이름' })
  @IsString()
  readonly user_name: string;

  /**
   * @brief 회원 생년월일.
   * @example '1990-01-01'
   */
  @ApiProperty({ description: '회원 생년월일' })
  @IsString()
  readonly birth_date: string;

  /**
   * @brief 회원 주소.
   * @example '서울특별시 강남구'
   */
  @ApiProperty({ description: '회원 주소' })
  @IsString()
  readonly address: string;

  /**
   * @brief 회원 전화번호. 010-nnnn-nnn 형식.
   * @example '010-1234-5678'
   */
  @ApiProperty({ description: '회원 전화번호 010-nnnn-nnn' })
  @IsString()
  readonly phone: string;

  /**
   * @brief 회원 이메일.
   * @example 'user@example.com'
   */
  @ApiProperty({ description: '회원 이메일' })
  @IsString()
  readonly email: string;

  /**
   * @brief 회원 비밀번호.
   * @example 'password123'
   */
  @ApiProperty({ description: '회원 비밀번호' })
  @IsString()
  readonly password: string;
}
