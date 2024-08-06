import { ApiProperty } from "@nestjs/swagger";

export class LoginResponseDTO {
  @ApiProperty({
    description: "결과 상태",
    example: "success",
  })
  status: string;

  @ApiProperty({
    description: "리다이렉트 URL",
    example: "/user/home",
  })
  redirect: string;

  @ApiProperty({
    description: "사용자 역할",
    example: "user",
  })
  role: string;
}
