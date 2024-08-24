/**
 * @file input.props.ts
 * @brief 입력 필드 컴포넌트의 props 정의 파일
 * @details 이 파일은 Input 컴포넌트에서 사용되는 props의 타입을 정의한다.
 * 
 * @author @zoeznm
 * @date 2024-08-25
 */

import { ChangeEvent, KeyboardEvent } from "react";

export default interface InputProps {
  id: string; // 입력 필드의 ID
  type: string; // 입력 필드의 타입 (예: text, password)
  value: string; // 입력 필드의 현재 값
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // 값 변경 핸들러
  placeholder?: string; // 입력 필드의 placeholder 텍스트 (선택 사항)
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void; // 키보드 입력 핸들러 (선택 사항)
  className?: string; // 입력 필드의 CSS 클래스 (선택 사항)
}
