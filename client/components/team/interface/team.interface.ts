export interface User {
  user_id: string;
}
export interface TeamNameFieldProps {
  teamName: string;
  setTeamName: (name: string) => void;
}
export interface TeamDescriptionFieldProps {
  teamDescription: string;
  setTeamDescription: (description: string) => void;
}
export interface LeaderSelectProps {
  leaders: User[];
  selectedLeader: User | null;
  addLeader: (user: User) => void;
  removeLeader: () => void;
}
export interface TeamButtonProps {
  handleSubmit: (e: React.FormEvent) => void;
}
