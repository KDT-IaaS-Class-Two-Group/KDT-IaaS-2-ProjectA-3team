import type { status } from "../type/status.type";

// Issue 인터페이스 정의
export interface Issue {
  issue_id: string
  issue_name: { value: string }; // 객체로 감싸진 값
  status: { value: status }; // 객체로 감싸진 값
  project_name: { value: string }; // 객체로 감싸진 값
  user_id: string;
}


