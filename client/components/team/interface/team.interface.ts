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
