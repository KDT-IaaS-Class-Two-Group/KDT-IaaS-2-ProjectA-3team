const loginFetch = async <T>(data: T): Promise<boolean> => {
  console.log("fetch on");
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }

  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};

export default loginFetch;
