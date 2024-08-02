export interface SessionDTO {
  user_id: string;
  role_name : string;
}

export interface LoginDTO {
  user_id: string;
  password: string;
}
export interface ResponseJson {
  status: string;
  redirect: string;
  role: string;
}

export interface UserDTO {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  // role_name: string;
  // salary: number;
  // field_name: string;
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
