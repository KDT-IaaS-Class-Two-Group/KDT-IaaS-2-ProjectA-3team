import React from 'react';

interface TableDataProps {
  structure: { column_name: string; data_type: string }[];
  data: any[];
  setEditingId: (id: string | null) => void;
  setUpdateRowData: (data: any) => void;
  deleteRow: (rowId: string) => void;
}

const TableData: React.FC<TableDataProps> = ({
  structure,
  data,
  setEditingId,
  setUpdateRowData,
  deleteRow,
}) => {
  return (
    <div>
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
                <button onClick={() => deleteRow(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
