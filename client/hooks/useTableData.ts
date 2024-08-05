import { useState, useEffect } from 'react';

const useTableData = (tableName: string) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTableData = async () => {
    if (tableName) {
      try {
        const dataResponse = await fetch(`/api/tables/${tableName}/data`);
        if (!dataResponse.ok) {
          throw new Error(
            `Error fetching table data: ${dataResponse.statusText}`
          );
        }
        const tableData = await dataResponse.json();
        setData(tableData);
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [tableName]);

  return { data, setData, error, setError, fetchTableData };
};

export default useTableData;
