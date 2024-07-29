import {
  Injectable,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DatabaseService } from 'src/database.service';
import { RegisterDataDTO } from '@shared/DTO/SharedDTO';
import { AuthService } from '../auth.service';
@Injectable()
export class RegisterService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly authService: AuthService,
  ) {}

  async register(data: RegisterDataDTO) {
    const duplicateResult = await this.authService.findUserEmailInDatabase(
      data.email,
    );
    //null이 아니라면, 즉 값이 포함되었다면 아래 if문을 들어가 에러를 리턴.
    if (duplicateResult) {
      throw new HttpException('중복된 사용자', HttpStatus.BAD_REQUEST);
    }

    const {
      email,
      id,
      password,
      name,
      phone_number,
      address,
      birth,
      position,
      join_date,
    } = data;
    const params = [
      email,
      id,
      password,
      name,
      phone_number,
      address,
      birth,
      position,
      join_date,
    ];

    const text = `
    INSERT INTO users (
        email, 
        id, 
        password, 
        name, 
        phone_number, 
        address, 
        birth, 
        position, 
        join_date
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    try {
      await this.databaseService.query(text, params);
    } catch {
      throw new InternalServerErrorException('사용자 등록 실패');
    }
  }
}
