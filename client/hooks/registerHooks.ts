import { useState } from "react";

import fetchRegisterData from "client/model/auth/fetchRegisterData";

import { PendingUserDTO } from "../../shared/DTO/SharedDTO";
import * as validate from "../model/validator/validateRegisterData";

/**
 * * Function : useRegisterHooks
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue : 
 * @function useRegisterHooks
  * @description : 회원가입 Form의 상태를 관찰하고 적절한 모델을 사용할 수 있도록 클로저 패턴을 사용.

 */
const useRegisterHooks = () => {
  const [user_id, setId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const validateAndRegister = () => {
    const data: PendingUserDTO = {
      user_id,
      username,
      birth_date: birthDate,
      address,
      phone,
      email,
      password,
    };

    let isValid = true;

    // Email validation
    if (!validate.validateEmail(email)) {
      console.log("이메일 형식이 잘못되었습니다.");
      isValid = false;
    }

    // id validation
    if (!validate.validateId(user_id)) {
      console.log("사용자 ID가 잘못되었습니다.");
      isValid = false;
    }

    if (!validate.validateName(username)) {
      console.log("사용자 이름이 잘못되었습니다.");
      isValid = false;
    }

    // Password validation
    if (!validate.ValidatePassword(password)) {
      console.log("비밀번호가 요구 사항을 충족하지 않습니다.");
      isValid = false;
    }

    // Address validation
    if (!validate.validateAddress(address)) {
      console.log("주소 형식이 잘못되었습니다.");
      isValid = false;
    }

    // Date validation
    if (!validate.validateDate(birthDate)) {
      console.log("생년월일 형식이 잘못되었습니다.");
      isValid = false;
    }

    // Password check
    if (password !== passwordCheck) {
      console.log("비밀번호 확인이 일치하지 않습니다.");
      isValid = false;
    }

    // If all validations pass, proceed with data registration
    if (isValid) {
      fetchRegisterData(data);
      console.log("성공");
    } else {
      console.log("회원가입에 실패했습니다.");
    }
  };

  return {
    user_id,
    setId,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
    phone,
    setPhone,
    address,
    setAddress,
    birthDate,
    setBirthDate,
    handleRegister: validateAndRegister,
  };
};

export default useRegisterHooks;
