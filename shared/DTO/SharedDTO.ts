export interface SessionDTO {  
  user_id : string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface UserDTO {
  user_id: number;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  role_name: string;
  salary: number;
  field_name: string;
}

export interface PendingUserDTO {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}
