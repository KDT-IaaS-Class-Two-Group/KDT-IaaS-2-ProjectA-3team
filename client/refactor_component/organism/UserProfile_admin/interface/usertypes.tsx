export interface User {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

// 프로필 데이터 타입 정의
export interface Profile {
  user_id: string; // 외래 키
  bio: string; // 자기소개
}

export interface UserPersonalProps {
  onSave: (users: User[]) => Promise<void>;
}