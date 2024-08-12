import { ApiProperty } from '@nestjs/swagger';

export class stackDTO {
  @ApiProperty({ description: '이름' })
  stack_name: string;
  @ApiProperty({ description: '타입' })
  stack_type: string;
}
