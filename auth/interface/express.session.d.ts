import { SessionDTO } from "@shared/DTO/SharedDTO";
import "express-session";

declare module "express-session" {
  interface SessionData {
    user?: SessionDTO;
  }
}
