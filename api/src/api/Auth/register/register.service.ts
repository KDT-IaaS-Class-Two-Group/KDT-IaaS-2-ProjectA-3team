import {
  Injectable,
  HttpStatus,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

import PendingUserRepository from 'src/database/application/pending_users.repository';
import { PendingUserDTO } from '@shared/DTO/SharedDTO';
/**
 * * Class : RegisterService
 * 작성자 : @naviadev / 2024-07-29
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @class RegisterService
 * @param private readonly userRepository: UserRepository  - 사용자의 회원가입 정보를 처리하는 레포지토리 인스턴스.
 * @description : UserRepository를 주입받고 사용하는 형태. 중복된 회원 검증과 가입 로직을 수행한다.
 */
@Injectable()
export class RegisterService {
  /**
   * @constructor
   * @param {PendingUserRepository} pendingUserRepository - 사용자의 회원가입 정보를 처리하는 레포지토리 인스턴스.
   */
  constructor(private readonly pendingUserRepository: PendingUserRepository) {}

  /**
   * @method ValidateDuplicate
   * @param {string} user_id - 검증할 사용자 ID.
   * @returns {Promise<boolean>} 중복 여부를 나타내는 Promise. 중복이 없는 경우 true, 중복이 있는 경우 false를 반환합니다.
   * @description 주어진 사용자 ID가 중복되지 않았는지 검증합니다.
   */
  private async ValidateDuplicate(user_id: string): Promise<boolean> {
    const duplicateResult =
      await this.pendingUserRepository.findOneByUser(user_id);
    if (duplicateResult) {
      return false; //중복된 사용자 존재
    }
    return true; // 중복된 사용자 없음
  }

  /**
   * @method register
   * @param {PendingUserDTO} userData - 가입할 사용자 정보가 담긴 DTO.
   * @returns {Promise<void>}
   * @throws {HttpException} 중복된 사용자의 경우 400 Bad Request 예외를 던집니다.
   * @throws {InternalServerErrorException} 가입 처리 중 오류가 발생한 경우 500 Internal Server Error 예외를 던집니다.
   * @description 사용자 정보를 기반으로 회원가입을 처리합니다. 중복된 사용자가 있는 경우 예외를 던지며, 가입 처리 중 오류가 발생하면 예외를 던집니다.
   */
  async register(userData: PendingUserDTO) {
    const isCheck = await this.ValidateDuplicate(userData.user_id);
    // 만약 해당 Email의 레코드값이 존재한다면 에러를 던질 수 있도록
    if (!isCheck) {
      throw new HttpException('중복된 사용자', HttpStatus.BAD_REQUEST);
    }

    // 회원가입 처리 시작.
    try {
      await this.pendingUserRepository.InsertNewUser(userData);
    } catch (error) {
      throw new InternalServerErrorException('가입 실패');
    }
  }
}
