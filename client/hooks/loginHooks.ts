import { useState } from "react";
import { useRouter } from "next/router";

import fetchLogin from "client/model/auth/fetchLoginData";

import * as validate from "../model/validator/validateRegisterData";

/**
 * * Function : useLoginHooks
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue :
 * @function useLoginHooks
 * @description : useLoginHooks에서 Form의 상태를 관찰할 수 있도록 state를 통해 메서드, 클로저 패턴을 활용하고, model 호출 등을 통해 로직을 수행할 수 있도록 한다.
 */
const useLoginHooks = () => {
  const [user_id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (validate.validateId(user_id) && validate.ValidatePassword(password)) {
      const result = await fetchLogin({ user_id, password });

      if (result !== false) {
        setIsLoggedIn(true);
        router.push(result);
      } else {
        console.log("로그인 실패");
      }
    } else {
      setIsLoggedIn(false);
    }
  };
  return {
    user_id,
    setId,
    password,
    setPassword,
    isLoggedIn,
    handleLogin,
  };
};

export default useLoginHooks;
