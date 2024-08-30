import { IsNotEmpty, IsString } from 'class-validator';
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
}
