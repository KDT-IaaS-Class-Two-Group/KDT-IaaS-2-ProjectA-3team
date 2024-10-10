"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useFetchTableData } from "../hooks/useFetchTableData";

const TablePage: React.FC = () => {
  const { tableName } = useParams<{ tableName: string }>();
  const { structure, data, error, fetchTableData, setError } =
    useFetchTableData(tableName);
  const [newData, setNewData] = useState<any>({});
  const [updateRowData, setUpdateRowData] = useState<any>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const addNewRow = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/tables/${tableName}/rows`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );
      if (response.ok) {
        fetchTableData();
        setNewData({});
      } else {
        const errorData = await response.json();
        throw new Error(`Error adding new row: ${errorData.message}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  const updateRow = async () => {
    if (editingId === null) {
      setError("Invalid ID for update");
      return;
    }
    console.log(`Updating row with ID: ${editingId}`, updateRowData);
    try {
      const response = await fetch(
        `http://localhost:3001/api/tables/${tableName}/rows/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateRowData),
        }
      );

      if (response.ok) {
        fetchTableData();
        setEditingId(null);
        setUpdateRowData({});
      } else {
        const errorData = await response.json();
        throw new Error(`Error updating row: ${errorData.message}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  const deleteRow = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/tables/${tableName}/rows/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchTableData();
      } else {
        const errorData = await response.json();
        throw new Error(`Error deleting row: ${errorData.message}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred");
      }
    }
  };

  return (
    <div>
      <h1>Table: {tableName}</h1>
      {error && <p>{error}</p>}
      <h2>Structure</h2>
      <ul>
        {structure.map((column) => (
          <li key={column.column_name}>
            {column.column_name} ({column.data_type})
          </li>
        ))}
      </ul>
      <h2>Data</h2>
      <table>
        <thead>
          <tr>
            {structure.map((column) => (
              <th key={column.column_name}>{column.column_name}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {structure.map((column) => (
                <td key={column.column_name}>{row[column.column_name]}</td>
              ))}
              <td>
                <button
                  onClick={() => {
                    console.log("Edit button clicked:", row);
                    if (row.id !== undefined) {
                      setEditingId(row.id);
                      setUpdateRowData(row);
                    } else {
                      console.error("Row id is undefined:", row);
                    }
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteRow(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingId !== null ? (
        <div>
          <h2>Edit Data</h2>
          {structure.map((column) => (
            <div key={column.column_name}>
              <label>{column.column_name}</label>
              <input
                type="text"
                value={updateRowData[column.column_name] || ""}
                onChange={(e) =>
                  setUpdateRowData({
                    ...updateRowData,
                    [column.column_name]: e.target.value,
                  })
                }
              />
            </div>
          ))}
          <button onClick={updateRow}>Save</button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>Add Data</h2>
          {structure.map((column) => (
            <div key={column.column_name}>
              <label>{column.column_name}</label>
              <input
                type="text"
                value={newData[column.column_name] || ""}
                onChange={(e) =>
                  setNewData({
                    ...newData,
                    [column.column_name]: e.target.value,
                  })
                }
              />
            </div>
          ))}
          <button onClick={addNewRow}>Add</button>
        </div>
      )}
    </div>
  );
};

export default TablePage;
