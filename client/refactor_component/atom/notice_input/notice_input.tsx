import React from "react";
import InputProps from "./props/notice_input_props";

const Input: React.FC<InputProps> = ({
    id,
    type,
    value,
    onChange,
    placeholder,
    style,
}) => {
    return (
        <input
            id={id} // input 요소의 ID
            type={type} // input 요소의 타입 (예: text, password)
            value={value} // input 요소의 현재 값
            onChange={onChange} // 값이 변경될 때 호출되는 함수
            placeholder={placeholder} // placeholder 텍스트
            className={style} // input 요소의 style
        />
    );
};

export default Input;