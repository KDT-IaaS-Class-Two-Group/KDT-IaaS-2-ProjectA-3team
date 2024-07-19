import { useState } from "react";
import ValidateEmail from "@validate/validateEmail";
import loginFetch from "@request/loginFetch";
import { loginDTO } from "model/auth/interface/authDTO";
import ValidatePassword from "@validate/validatePassword";


const loginViewModel = () => {

  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = async (): Promise<boolean> => {
    console.log(id);
    console.log(password);
    if (id.trim() === "" || password.trim() === "") {
      return false;
    }
    if (!ValidateEmail(id) || !ValidatePassword(password)) {
      return false;
    }
    const success = await loginFetch<loginDTO>({
      email: id,
      password: password
    });
    if (success) {
      setIsLoggedIn(true);
      return true;
    } else {
      return false;
    }
  };

  return {
    id,
    password,
    isLoggedIn,
    setId,
    setPassword,
    handleLogin,
  };
};

export default loginViewModel;