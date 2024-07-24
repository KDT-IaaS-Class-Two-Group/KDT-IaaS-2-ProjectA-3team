import React, { useState } from "react";
import useFetchDivData from "../hooks/useFetchDivData";
import SelectOption from "./SelectOption";

const ManageDiv: React.FC = () => {
  const { columns } = useFetchDivData();
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const handleClick = (name: string) => {
    setSelectedName(name);
  };

  return (
    <div>
      <h1>User Names</h1>
      {columns.length > 0 ? (
        <ul>
          {columns.map((name, index) => (
            <li
              onClick={() => handleClick(name)}
              key={index}
              role="button"
              onKeyPress={(e) => e.key === "Enter" && handleClick(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
      {selectedName && <SelectOption name={selectedName} />}
    </div>
  );
};

export default ManageDiv;
