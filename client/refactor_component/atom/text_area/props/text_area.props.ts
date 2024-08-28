import { ChangeEventHandler } from "react";
import { ReactNode } from "react";
export default interface TextAreaProps {
  value?: string; // 텍스트 영역의 현재 값
  onChange?: ChangeEventHandler<HTMLTextAreaElement>; // 값이 변경될 때 호출되는 함수
  name?: string; // 텍스트 영역의 이름
  id?: string; // 텍스트 영역의 ID
  placeholder?: string; // 텍스트 영역의 placeholder 텍스트
  className: string; // 텍스트 영역의 스타일 클래스 이름 (선택적)
  children?: ReactNode;
}
