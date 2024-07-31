import { useState } from "react";

import fetchRegisterData from "client/model/auth/fetchRegisterData";

import { RegisterDataDTO } from "../../shared/DTO/SharedDTO";
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
  const [email, setEmail] = useState<string>("");
  const [id, setId] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [birth, setBirth] = useState<Date>(new Date());
  const [position, setPosition] = useState<number>(1);
  const [joinDate, setJoinDate] = useState<Date>(new Date());

  const handleRegister = () => {
    const data: RegisterDataDTO = {
      email,
      id: 1,
      password,
      name,
      phone_number: phoneNumber,
      address,
      birth,
      position: 1,
      join_date: joinDate,
    };

    if (
      validate.validateEmail(email) &&
      validate.validateName(name) &&
      validate.ValidatePassword(password) &&
      validate.validateAddress(address) &&
      validate.validateDate(birth) &&
      password == passwordCheck
    ) {
      fetchRegisterData(data);
    } else {
      return false;
    }
    console.log("성공");
  };

  return {
    email,
    setEmail,
    id,
    setId,
    name,
    setName,
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    birth,
    setBirth,
    position,
    setPosition,
    joinDate,
    setJoinDate,
    handleRegister,
  };
};

export default useRegisterHooks;
