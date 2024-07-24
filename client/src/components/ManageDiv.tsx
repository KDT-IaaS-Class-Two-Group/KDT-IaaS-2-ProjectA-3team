import React from "react";
import useFetchDivData from "../hooks/useFetchDivData";

const ManageDiv: React.FC = () => {
  const { columns } = useFetchDivData();

  return (
    <div>
      <h1>User Names</h1>
      {columns.length > 0 ? (
        <ul>
          {columns.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};
export default ManageDiv;
