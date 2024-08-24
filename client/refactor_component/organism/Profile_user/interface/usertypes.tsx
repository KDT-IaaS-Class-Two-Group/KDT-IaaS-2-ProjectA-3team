// types.ts

// User 타입 정의
export interface User {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

// Profile 타입 정의
export interface Profile {
  user_id: string;
  bio: string;
}

export interface UserPersonalProps {
  onSave?: (users: User[]) => Promise<void>; // onSave를 선택적으로 받도록 수정
}

export interface EditFields {
  username?: string;
  birth_date?: string;
  address?: string;
  phone?: string;
  email?: string;
  password?: string;
}