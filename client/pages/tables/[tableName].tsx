import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Column {
  column_name: string;
  data_type: string;
}

interface TableRow {
  [key: string]: any;
}

const TablePage = () => {
  const router = useRouter();
  const { tableName } = router.query;
  const [structure, setStructure] = useState<Column[]>([]);
  const [data, setData] = useState<TableRow[]>([]);
  const [newData, setNewData] = useState<TableRow>({});
  const [updateRowData, setUpdateRowData] = useState<TableRow>({});
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchTableData = async () => {
    if (tableName) {
      try {
        const structureResponse = await fetch(
          `http://localhost:3001/api/tables/${tableName}/structure`
        );
        if (!structureResponse.ok) {
          throw new Error(
            `Error fetching table structure: ${structureResponse.statusText}`
          );
        }
        const structureData = await structureResponse.json();
        setStructure(structureData);

        const dataResponse = await fetch(
          `http://localhost:3001/api/tables/${tableName}/data`
        );
        if (!dataResponse.ok) {
          throw new Error(
            `Error fetching table data: ${dataResponse.statusText}`
          );
        }
        const tableData = await dataResponse.json();
        setData(tableData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error occurred');
        }
      }
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [tableName]);

  const addNewRow = async () => {
    if (!['stack', 'field'].includes(tableName as string)) {
      setError(
        'Only "stack" and "field" tables are allowed for adding new rows.'
      );
      return;
    }
    const response = await fetch(
      `http://localhost:3001/api/tables/${tableName}/rows`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      }
    );
    if (response.ok) {
      fetchTableData();
      setNewData({});
    } else {
      const errorData = await response.json();
      setError(`Error adding new row: ${errorData.message}`);
    }
  };

  const updateRow = async () => {
    if (editingId === null) {
      setError('Invalid ID for update');
      return;
    }
    if (!['stack', 'field'].includes(tableName as string)) {
      setError(
        'Only "stack" and "field" tables are allowed for updating rows.'
      );
      return;
    }
    console.log(`Updating row with ID: ${editingId}`, updateRowData);
    try {
      const response = await fetch(
        `http://localhost:3001/api/tables/${tableName}/rows/${editingId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
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
        setError(`Error updating row: ${errorData.message}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error updating row: ${err.message}`);
      } else {
        setError('Unknown error occurred');
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
                    console.log('Edit button clicked:', row);
                    if (row.id !== undefined) {
                      setEditingId(row.id);
                      setUpdateRowData(row);
                    } else {
                      console.error('Row id is undefined:', row);
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
          {structure.map(
            (column) =>
              ['stack', 'field'].includes(column.column_name) && (
                <div key={column.column_name}>
                  <label>{column.column_name}</label>
                  <input
                    type="text"
                    value={updateRowData[column.column_name] || ''}
                    onChange={(e) =>
                      setUpdateRowData({
                        ...updateRowData,
                        [column.column_name]: e.target.value,
                      })
                    }
                  />
                </div>
              )
          )}
          <button onClick={updateRow}>Save</button>
          <button onClick={() => setEditingId(null)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>Add Data</h2>
          {structure.map(
            (column) =>
              ['stack', 'field'].includes(column.column_name) && (
                <div key={column.column_name}>
                  <label>{column.column_name}</label>
                  <input
                    type="text"
                    value={newData[column.column_name] || ''}
                    onChange={(e) =>
                      setNewData({
                        ...newData,
                        [column.column_name]: e.target.value,
                      })
                    }
                  />
                </div>
              )
          )}
          <button onClick={addNewRow}>Add</button>
        </div>
      )}
    </div>
  );
};

export default TablePage;
