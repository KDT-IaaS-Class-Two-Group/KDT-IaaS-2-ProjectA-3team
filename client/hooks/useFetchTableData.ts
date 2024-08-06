import { useState, useEffect } from 'react';

interface ColumnStructure {
  column_name: string;
  data_type: string;
}

export const useFetchTableData = (tableName: string) => {
  const [structure, setStructure] = useState<ColumnStructure[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTableData = async () => {
    if (tableName) {
      try {
        const structureResponse = await fetch(`http://localhost:3001/api/tables/${tableName}/structure`);
        if (!structureResponse.ok) {
          throw new Error(`Error fetching table structure: ${structureResponse.statusText}`);
        }
        const structureData = await structureResponse.json();
        setStructure(structureData);

        const dataResponse = await fetch(`http://localhost:3001/api/tables/${tableName}/data`);
        if (!dataResponse.ok) {
          throw new Error(`Error fetching table data: ${dataResponse.statusText}`);
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

  return { structure, data, error, fetchTableData, setError };
};
