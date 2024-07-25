import { SessionUserInterface } from '@shared/DTO/SharedDTO';
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: SessionUserInterface;
  }
}
