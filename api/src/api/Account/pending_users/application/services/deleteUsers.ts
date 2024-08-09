import { Injectable } from '@nestjs/common';
import { PendingUserRepository } from 'src/api/common/infrastructure/Repository/pending_users.repository';

@Injectable()
export class DeleteUsers {
  constructor(private readonly pendingUserRepository: PendingUserRepository) {}
  async deleteUser(user_id: string) {
    this.pendingUserRepository.deleteUser(user_id);
  }
}
