import React from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import useDataServeEvent from "./hooks/useDataServeEvent";
import DynamicInputForm from "./components/DynamicInputForm";
import ManageDiv from "./components/ManageDiv";
const App: React.FC = () => {
  const { inputValue, setInputValue, sendDataToServer } = useDataServeEvent();
  return (
    <div>
      {/* <Input inputValue={inputValue} setInputValue={setInputValue} />
      <Button eventFunc={sendDataToServer} /> */}
      <DynamicInputForm />
      <ManageDiv />
    </div>
  );
};

export default App;
