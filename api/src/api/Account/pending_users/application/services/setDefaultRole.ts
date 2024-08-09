import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from 'src/api/common/infrastructure/Repository/employee.repository';

@Injectable()
export class SetDefalutRole {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
  async setDefaultRole(user_id: string): Promise<void> {
    this.employeeRepository.setEmpolyeeUser(user_id);
  }
}
