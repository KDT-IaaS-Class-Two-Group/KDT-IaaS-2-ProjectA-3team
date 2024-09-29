import { IsObject, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TeamMemberDTO {
  @IsObject()
  @ValidateNested() // 객체의 내부를 검사합니다.
  @Type(() => Object) // class-validator에서 객체를 제대로 인식할 수 있게 합니다.
  team_leader: { [key: string]: string };

  @IsArray()
  @ValidateNested({ each: true }) // 배열 내의 객체도 검사합니다.
  @Type(() => Object)
  team_members: { [key: string]: string }[];
}
