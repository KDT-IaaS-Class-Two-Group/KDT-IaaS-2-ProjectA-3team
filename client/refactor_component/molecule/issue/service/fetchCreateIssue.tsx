const fetchCreateIssue = async (project_name: string, issue_name: string) => {
  const response = await fetch("http://localhost:3001/issue/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ project_name, issue_name }),
  });

  if (!response.ok) {
    throw new Error("Fetch 실패 - POST issue");
  }

  return true;
};
export default fetchCreateIssue;
