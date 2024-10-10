import { useState } from "react";
import { useRouter } from "next/router";
import fetchLogin from "../service/fetch_fetchLoginData";
import * as validate from "client/model/validator/validateRegisterData";

/**
 * * Function : useLoginHooks
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-08-02
 * Issue :
 * @function useLoginHooks
 * @description : useLoginHooks에서 Form의 상태를 관찰할 수 있도록 state를 통해 메서드, 클로저 패턴을 활용하고, model 호출 등을 통해 로직을 수행할 수 있도록 한다.
 */
const useLoginHooks = () => {
  // id Input Value
  const [user_id, setId] = useState("");
  // password Input Value
  const [password, setPassword] = useState("");
  // 로그인 성공 여부 체크
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // ? Login Fetch가 정상적으로 처리됐다면, useRouter를 인스턴스받은 router를 통해, 적절한 경로 처리를 수행한다.
  const router = useRouter();

  const handleLogin = async () => {
    // Id와 Password의 유효성 검사
    if (validate.validateId(user_id) && validate.ValidatePassword(password)) {
      // Fetch 후, 서버로부터 Response를 반환받는다.
      const result = await fetchLogin({ user_id, password });
      if (result !== false) {
        console.log(result);
        setIsLoggedIn(true);
        router.push(result);
      } else {
        // [ ] ! Modal로 변경할 필요가 있다.
        alert("로그인 실패");
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
