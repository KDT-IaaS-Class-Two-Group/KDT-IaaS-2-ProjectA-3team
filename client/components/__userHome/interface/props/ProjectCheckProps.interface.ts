import { SessionData } from "client/ts/Interface/SessionData.interface";

export interface ProjectCheckProps{
  sessionData : SessionData | null;
  onMenuItemClick: (component: React.ReactNode) => void;
}