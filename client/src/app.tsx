import React from "react";
const Input: React.FC = () => {
  return <input type="text" placeholder="Enter your input here" />;
};
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
