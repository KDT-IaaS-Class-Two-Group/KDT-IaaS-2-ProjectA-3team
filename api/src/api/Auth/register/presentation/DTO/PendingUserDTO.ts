// // src/shared/DTO/PendingUserDTO.ts
// import { ApiProperty } from '@nestjs/swagger';

// export class PendingUserDTO {
//   @ApiProperty({
//     description: '사용자의 고유 ID',
//     example: '1234567890',
//   })
//   user_id: string;

//   @ApiProperty({
//     description: '사용자의 사용자 이름',
//     example: 'hong_gildong',
//   })
//   username: string;

//   @ApiProperty({
//     description: '사용자의 이름',
//     example: '홍길동',
//   })
//   name: string;

//   @ApiProperty({
//     description: '사용자의 이메일 주소',
//     example: 'hong@example.com',
//   })
//   email: string;

//   @ApiProperty({
//     description: '사용자의 비밀번호',
//     example: 'password123',
//   })
//   password: string;

//   @ApiProperty({
//     description: '사용자의 생년월일',
//     example: '1994-03-25',
//     format: 'date',
//   })
//   birth_date: string;

//   @ApiProperty({
//     description: '사용자의 나이',
//     example: 30,
//     required: false,
//   })
//   age?: number;

//   @ApiProperty({
//     description: '사용자의 전화번호',
//     example: '+821012345678',
//   })
//   phone: string;

//   @ApiProperty({
//     description: '사용자의 주소',
//     example: '서울특별시 강남구',
//     required: false,
//   })
//   address?: string;
// }
