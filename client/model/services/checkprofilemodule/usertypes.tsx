export interface User {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}
export interface CheckprofileProps {
  onSave: (checkusers: User[]) => Promise<void>;
}