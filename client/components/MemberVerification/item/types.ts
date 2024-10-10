// types.ts
export interface User {
  id: number;
  name: string;
  role: string;
  salary: number;
  role_name?: string;
  field_name?: string;
  [key: string]: string | number | undefined; // 인덱스 시그니처 추가
}
  
  export interface SelectOption {
    value: string;
    label: string;
  }
  