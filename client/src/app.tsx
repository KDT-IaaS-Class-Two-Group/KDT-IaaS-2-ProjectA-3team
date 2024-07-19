import React from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import useDataServeEvent from "./hooks/useDataServeEvent";
const App: React.FC = () => {
  return (
    <div>
      <Input />
      <Button eventFunc={useDataServeEvent} />
    </div>
  );
};

export default App;
