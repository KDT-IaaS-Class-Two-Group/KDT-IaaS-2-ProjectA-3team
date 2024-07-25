import { useState } from "react";

import fetchLogin from "client/model/auth/fetchLoginData";

import * as validate from "../model/auth/validateRegisterData";

const useLoginHooks = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (validate.validateEmail(email) && validate.ValidatePassword(password)) {
      fetchLogin({ email, password });
    } else {
      return false;
    }
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
};

export default useLoginHooks;
