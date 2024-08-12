import { Injectable } from '@nestjs/common';
import { StackRepository } from 'src/api/Stack/infrastructure/repository/stack.repository';
import { SearchStacksQuery } from '../searchStack.query';
import { Stack } from 'src/api/Stack/domain/entities/stack.entity';

/**
 * * Decorator : Injectable
 * 작성자 : @naviadev / 2024-08-12
 * 편집자 : @naviadev / 2024-08-12
 * Issue :
 * @decorator Injectable
 * @description : Repository를 통해 데이터베이스 영역에 간접적으로 접근하는 클래스.
 * query 클래스를 통해 모든 객체를 읽어오거나, name이 포함된 일부 레코드를 읽어오는 역할을 수행한다.
 */
@Injectable()
export class StackQueryHandler {
  constructor(private readonly stackRepository: StackRepository) {}

  async handleGetAllStacks(): Promise<Stack[]> {
    return this.stackRepository.findAll();
  }

  async handleSearchStacks(query: SearchStacksQuery): Promise<Stack[]> {
    return this.stackRepository.findByName(query.name);
  }
}
