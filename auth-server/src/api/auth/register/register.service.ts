import {
  Injectable,
  HttpStatus,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

import UserRepository from 'src/database/users.repository';
import { RegisterDataDTO } from '@shared/DTO/SharedDTO';

@Injectable()
/**
 * * Class : RegisterService
 * 작성자 : @naviadev / 2024-07-29
 * 편집자 : @naviadev / 2024-07-29
 * Issue :
 * @class RegisterService
 * @param private readonly userRepository: UserRepository
 * @description : UserRepository를 주입받고 사용하는 형태. 중복된 회원 검증과 가입 로직을 수행한다.
 */
export class RegisterService {
  constructor(private readonly userRepository: UserRepository) {}

  private async ValidateDuplicate(email: string): Promise<boolean> {
    const duplicateResult = await this.userRepository.findOneByEmail(email);
    if (duplicateResult) {
      return false;
    }
    return true;
  }
  async register(userData: RegisterDataDTO) {
    const isCheck = await this.ValidateDuplicate(userData.email);

    // 만약 해당 Email의 레코드값이 존재한다면 에러를 던질 수 있도록
    if (!isCheck) {
      throw new HttpException('중복된 사용자', HttpStatus.BAD_REQUEST);
    }

    // 회원가입 처리 시작.
    try {
      await this.userRepository.InsertNewUser(userData);
    } catch (error) {
      throw new InternalServerErrorException('가입 실패');
    }
  }
}
