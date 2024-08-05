import { useState, useEffect } from 'react';

const useTableStructure = (tableName: string) => {
  const [structure, setStructure] = useState<
    { column_name: string; data_type: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const fetchTableStructure = async () => {
    if (tableName) {
      try {
        const structureResponse = await fetch(
          `/api/tables/${tableName}/structure`
        );
        if (!structureResponse.ok) {
          throw new Error(
            `Error fetching table structure: ${structureResponse.statusText}`
          );
        }
        const structureData = await structureResponse.json();
        setStructure(structureData);
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  useEffect(() => {
    fetchTableStructure();
  }, [tableName]);

  return { structure, error };
};

export default useTableStructure;
