import React from 'react';

interface TableStructureProps {
  structure: { column_name: string; data_type: string }[];
}

const TableStructure: React.FC<TableStructureProps> = ({ structure }) => {
  return (
    <div>
      <h2>Structure</h2>
      <ul>
        {structure.map((column) => (
          <li key={column.column_name}>
            {column.column_name} ({column.data_type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableStructure;
