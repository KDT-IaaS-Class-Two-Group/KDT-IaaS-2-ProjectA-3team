import React, { useState } from "react";
import useFetchInputData from "../hooks/useFetchInputData";
import Input from "./Input";
import Button from "./Button";
import useDataServeEvent from "../hooks/useDataServeEvent";

const DynamicInputForm: React.FC = () => {
  const { columns } = useFetchInputData();
  const { sendDataToServer } = useDataServeEvent();
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});

  const handleInputChange = (column: string, value: string) => {
    setInputs((prev) => ({ ...prev, [column]: value }));
  };

  // 서버로 데이터를 전송하는 함수
  const handleSubmit = () => {
    fetch("http://localhost:3000/useDataServeEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs), // inputs 객체를 서버로 전송
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <form>
      {columns.map((column) => (
        <div key={column}>
          <label htmlFor={column}>{column}</label>
          <Input
            inputValue={inputs[column] || ""}
            setInputValue={(value) => handleInputChange(column, value)}
          />
        </div>
      ))}
      <Button eventFunc={handleSubmit} />{" "}
      {/* 전송 버튼을 handleSubmit으로 수정 */}
    </form>
  );
};

export default DynamicInputForm;
