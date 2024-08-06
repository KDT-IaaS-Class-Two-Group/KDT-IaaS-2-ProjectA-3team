import { useState } from "react";
import { useRouter } from "next/router";
import { useFetchTableData } from "../../hooks/useFetchTableData";

interface Column {
  column_name: string;
  data_type: string;
}

interface Row {
  [key: string]: any;
}

const TablePage: React.FC = () => {
  const router = useRouter();
  const { tableName } = router.query;
  const { structure, data, error, fetchTableData, setData, setError } =
    useFetchTableData(tableName as string);
  const [newData, setNewData] = useState<Row>({});
  const [updateRowData, setUpdateRowData] = useState<Row>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const getIdField = (tableName: string) => {
    if (tableName === "stack") return "stack_name";
    if (tableName === "field") return "field_name";
    return "id";
  };

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
    console.log(
      `Updating row with ${getIdField(tableName as string)}: ${editingId}`,
      updateRowData
    );
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
        setData((prevData: Row[]) =>
          prevData.map((row) =>
            row[getIdField(tableName as string)] === editingId
              ? updateRowData
              : row
          )
        );
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

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    action: () => void
  ) => {
    if (event.key === "Enter") {
      action();
    }
  };

  return (
    <div>
      <h1>Table: {tableName}</h1>
      {error && <p>{error}</p>}
      <h2>Structure</h2>
      <ul>
        {structure.map((column: Column) => (
          <li key={column.column_name}>
            {column.column_name} ({column.data_type})
          </li>
        ))}
      </ul>
      <h2>Data</h2>
      <table>
        <thead>
          <tr>
            {structure.map((column: Column) => (
              <th key={column.column_name}>{column.column_name}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: Row) => (
            <tr key={row[getIdField(tableName as string)]}>
              {structure.map((column: Column) => (
                <td key={column.column_name}>{row[column.column_name]}</td>
              ))}
              <td>
                <button
                  onClick={() => {
                    console.log("Edit button clicked:", row);
                    const idField = getIdField(tableName as string);
                    if (row[idField] !== undefined) {
                      setEditingId(row[idField]);
                      setUpdateRowData(row);
                    } else {
                      console.error(`Row ${idField} is undefined:`, row);
                    }
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingId !== null ? (
        <div>
          <h2>Edit Data</h2>
          {structure.map((column: Column) => (
            <div key={column.column_name}>
              <label>{column.column_name}</label>
              <input
                placeholder="스택을 입력하세요"
                type="text"
                value={updateRowData[column.column_name] || ""}
                onChange={(e) =>
                  setUpdateRowData({
                    ...updateRowData,
                    [column.column_name]: e.target.value,
                  })
                }
                onKeyDown={(e) => handleKeyDown(e, updateRow)}
              />
            </div>
          ))}
          <button onClick={updateRow}>Save</button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>Add Data</h2>
          {structure.map((column: Column) => (
            <div key={column.column_name}>
              <label>{column.column_name}</label>
              <input
                placeholder="스택을 입력하세요"
                type="text"
                value={newData[column.column_name] || ""}
                onChange={(e) =>
                  setNewData({
                    ...newData,
                    [column.column_name]: e.target.value,
                  })
                }
                onKeyDown={(e) => handleKeyDown(e, addNewRow)}
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
