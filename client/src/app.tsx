import React from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import useDataServeEvent from "./hooks/useDataServeEvent";
const App: React.FC = () => {
  const { inputValue, setInputValue, sendDataToServer } = useDataServeEvent();
  return (
    <div>
      <Input />
      <Button eventFunc={sendDataToServer} />
    </div>
  );
};

export default App;
