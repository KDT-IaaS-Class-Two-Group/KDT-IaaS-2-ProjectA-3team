import { ApiProperty } from '@nestjs/swagger';

/**
 * @class LoginResponseDTO
 * @brief 로그인 요청에 대한 응답 데이터를 담는 DTO.
 */
export class LoginResponseDTO {
  /**
   * @brief 로그인 결과 상태.
   * @example 'success'
   */
  @ApiProperty({
    description: '결과 상태',
    example: 'success',
  })
  status: string;

  /**
   * @brief 로그인 후 리다이렉트될 URL.
   * @example '/user/home'
   */
  @ApiProperty({
    description: '리다이렉트 URL',
    example: '/user/home',
  })
  redirect: string;

  /**
   * @brief 로그인한 사용자의 역할.
   * @example 'user'
   */
  @ApiProperty({
    description: '사용자 역할',
    example: 'user',
  })
  role: string;
}
