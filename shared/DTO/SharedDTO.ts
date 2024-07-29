export interface RegisterDataDTO {
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
export interface SessionDTO {
  email: string;
  id: number;
  name: string;
  phone_number: string;
  address: string;
  birth: Date;
  position?: number;
  join_date: Date;
}

export interface LoginDTO {
  email: string,
  password: string
}