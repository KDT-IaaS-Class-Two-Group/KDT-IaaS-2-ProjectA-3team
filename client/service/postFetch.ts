const postFetchData = async (stringfy: string, url: string) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: stringfy,
  });
  return res;
};
export default postFetchData;
