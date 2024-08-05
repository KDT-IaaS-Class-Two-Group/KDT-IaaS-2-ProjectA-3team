import React from 'react';

interface TableActionsProps {
  structure: { column_name: string; data_type: string }[];
  newData: any;
  updateRowData: any;
  setNewData: (data: any) => void;
  setUpdateRowData: (data: any) => void;
  addNewRow: () => void;
  updateRow: () => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
}

const TableActions: React.FC<TableActionsProps> = ({
  structure,
  newData,
  updateRowData,
  setNewData,
  setUpdateRowData,
  addNewRow,
  updateRow,
  editingId,
  setEditingId,
}) => {
  return (
    <div>
      {editingId !== null ? (
        <div>
          <h2>Edit Data</h2>
          {structure.map((column) => (
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
                value={newData[column.column_name] || ''}
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

export default TableActions;
