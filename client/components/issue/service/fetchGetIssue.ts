export const fetchGetIssue = async (project_name: string) => {
  const response = await fetch(`http://localhost:3001/issue/${project_name}`);
  const result = await response.json();
  return result;
}