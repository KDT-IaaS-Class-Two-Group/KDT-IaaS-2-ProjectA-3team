import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @class PendingUserDTO
 * @description 대기중인 사용자의 데이터 전송 객체 (DTO)입니다.
 *  * 작성자 : @zoeznm / 2024-08-30
 *  *편집자 : @zoeznm / 2024-08-30
 * 대기중인 사용자의 ID를 포함합니다.
 */
export class PendingUserDTO {
  /**
   * @property {string} user_id - 대기중인 사용자의 ID.
   * @description 사용자의 고유 식별자를 나타내며, 대기중인 사용자를 식별하는 데 사용됩니다.
   * @example '1234567890'
   */
  @ApiProperty({
    description: '대기중인 사용자의 ID',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  readonly user_id: string;

  /**
   * @property {number} salary - 사용자의 월급.
   * @description 사용자의 월급을 나타냅니다.
   * @example 5000
   */
  @ApiProperty({
    description: '사용자의 월급',
    example: 5000,
    required: false, // 선택적 필드
  })
  @IsOptional()
  @IsNumber()
  readonly salary?: number;

  /**
   * @property {string} field_name - 사용자의 분야.
   * @description 사용자의 분야를 나타냅니다.
   * @example 'Engineering'
   */
  @ApiProperty({
    description: '사용자의 분야',
    example: 'Engineering',
    required: false, // 선택적 필드
  })
  @IsOptional()
  @IsString()
  readonly field_name?: string;

  /**
   * @property {string} role_name - 사용자의 권한.
   * @description 사용자의 권한을 나타냅니다.
   * @example 'employee'
   */
  @ApiProperty({
    description: '사용자의 권한',
    example: 'employee',
    required: false, // 선택적 필드
  })
  @IsOptional()
  @IsString()
  readonly role_name?: string;
}
