export interface CreateUserInterface {
  email: string;
  id: number;
  password: string;
  name: string;
  phone_number: string;
  address: string;
  birth: Date;
  position?: number;
  join_date: Date;
}