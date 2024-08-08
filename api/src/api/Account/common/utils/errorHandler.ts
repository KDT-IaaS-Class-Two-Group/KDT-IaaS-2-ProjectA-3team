import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  handleError(condition: boolean, message: string) {
    if (condition) {
      console.error(message);
      throw new InternalServerErrorException(message);
    }
  }

  handleNotFound(condition: boolean, message: string) {
    if (condition) {
      console.error(message);
      throw new NotFoundException(message);
    }
  }
}
