/**
 * @file registr_form_field.props.ts
 * @brief 폼 필드 컴포넌트의 props 정의 파일
 * @details 이 파일은 FormField 컴포넌트에서 사용되는 props의 타입을 정의한다.
 * 
 * @author @zoeznm
 * @date 2024-08-25
 */

import { ChangeEventHandler } from "react";

export default interface FormFieldProps {
  id: string; // 입력 필드의 ID
  label: string; // 레이블 텍스트
  value: string; // 입력 필드의 현재 값
  input_type: string; // 입력 필드의 타입 (예: text, password)
  placeholder: string; // 입력 필드의 placeholder 텍스트
  onChange: ChangeEventHandler<HTMLInputElement>; // 값 변경 핸들러
  className?: string; // 입력 필드에 적용할 스타일 클래스 이름 (선택 사항)
}
