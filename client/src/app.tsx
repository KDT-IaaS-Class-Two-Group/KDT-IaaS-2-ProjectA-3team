import React from "react";
import Input from "./components/Input";
const Button: React.FC = () => {
  return <button>Submit</button>;
};
const App: React.FC = () => {
  return (
    <div>
      <Input />
      <Button />
    </div>
  );
};

export default App;
