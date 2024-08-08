// import { Injectable } from '@nestjs/common';
// import { QueryBuilder } from 'src/database/queryBuilder';

// @Injectable()
// export class ValidateDuplicate {
//   constructor(private readonly qb: QueryBuilder) {}

//   async ValidateDuplicate(user_id: string): Promise<boolean> {
//     const duplicateResult =
//       await this.pendingUserRepository.findOneByUser(user_id);
//     if (duplicateResult) {
//       return false;
//     }
//     return true;
//   }
// }
