import { Injectable } from '@nestjs/common';
import { PendingUserDTO } from 'src/api/common/infrastructure/DTO/pendingUsers';
import { UserRepository } from 'src/api/common/infrastructure/Repository/Users.repository';

@Injectable()
export class MigrationUserData {
  constructor(private readonly userRepository: UserRepository) {}

  async migrationUserData(data: PendingUserDTO): Promise<void> {
    this.userRepository.migrationUserData(data);
  }
}
