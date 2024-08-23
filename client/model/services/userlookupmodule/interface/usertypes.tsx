// types.ts
export interface User {
  id: string;
  username: string;
  salary?: number;
  role_name?: string;
  field_name?: string;
}

export interface Field {
  field_name: string;
}

export interface UserLookupProps {
  onSave: (users: User[]) => Promise<void>;
}
