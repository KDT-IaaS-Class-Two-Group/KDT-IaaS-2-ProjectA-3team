//데이터 받아서 서버로 전송하는 이벤트 함수
import { useState } from "react";
import * as dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/../../.env` });
const port = process.env.PORT;

const useDataServeEvent = () => {
  const [inputValue, setInputValue] = useState<string>("");

  // 서버로 데이터를 전송하는 함수
  const sendDataToServer = async () => {
    try {
      const response = await fetch(`http://localhost:${port}/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: inputValue }), // 입력값을 서버로 전송
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log(`${inputValue} 전송됨`);
    } catch (error) {
      console.error("Failed to send data:", error);
    }
  };

  return {
    inputValue,
  };
};

export default useDataServeEvent;
