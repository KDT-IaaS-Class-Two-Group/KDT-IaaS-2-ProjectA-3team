export const PedingUserFetchBody = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include" as RequestCredentials,
  };
};
