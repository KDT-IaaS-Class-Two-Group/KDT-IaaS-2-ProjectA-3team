export const fetchGetKanban = async (user_id: string) => {
  const response = await fetch(`http://localhost:3001/issue/all`);
  const result = await response.json();
  console.log('result:', result);
  return result;
}