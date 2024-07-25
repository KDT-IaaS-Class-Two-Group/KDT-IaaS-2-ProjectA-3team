import { LoginDTO } from "../../../shared/DTO/SharedDTO";

const fetchLogin = async (test: LoginDTO) => {
  const response = await fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(test),
    credentials: "include",
  });
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

export default fetchLogin;
