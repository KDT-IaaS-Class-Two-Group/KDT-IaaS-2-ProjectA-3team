import { useState } from "react";

import fetchLogin from "client/model/auth/fetchLoginData";

import * as validate from "../model/auth/validateRegisterData";

const useLoginHooks = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const handleLogin = async () => {
    if (validate.validateEmail(email) && validate.ValidatePassword(password)) {
      setIsLoggedIn(await fetchLogin({ email, password }));
    } else {
      setIsLoggedIn(false);
    }
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoggedIn,
    handleLogin,
  };
};

export default useLoginHooks;
