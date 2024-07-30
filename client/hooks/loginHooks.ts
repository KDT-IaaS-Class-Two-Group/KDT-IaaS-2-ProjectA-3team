import { useState } from "react";
import { useRouter } from "next/router";

import fetchLogin from "client/model/auth/fetchLoginData";

import * as validate from "../model/auth/validateRegisterData";

const useLoginHooks = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (validate.validateEmail(email) && validate.ValidatePassword(password)) {
      const result = await fetchLogin({ email, password });

      setIsLoggedIn((value) => {
        value = result;
        return value;
      });

      if (result) {
        router.push("/project/main");
      } else {
        console.log("실패");
      }
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
