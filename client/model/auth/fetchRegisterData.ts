import { RegisterDataDTO } from "../../../shared/DTO/SharedDTO";

const fetchRegisterData = async (test: RegisterDataDTO) => {
  const response = await fetch("http://localhost:3001/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(test),
  });
  if (response.ok) {
    console.log(response);
  }
};

export default fetchRegisterData;
