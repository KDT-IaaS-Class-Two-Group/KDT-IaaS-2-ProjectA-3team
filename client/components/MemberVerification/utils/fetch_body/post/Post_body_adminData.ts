export const AdminFetchBody = (item: { [key: string]: any }) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include" as RequestCredentials,
    body: JSON.stringify(item),
  };
};
