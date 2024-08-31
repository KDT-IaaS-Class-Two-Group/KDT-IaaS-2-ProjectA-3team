const send = (state:string, stateContent:string) => {
  return fetch("http://localhost:3001/notice/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ title: state, content: stateContent }),
  })
    .then((response) =>response.text())
    .then((data) => {
      console.log("Success", data);
    })
    .catch((error) => {
      console.error("Server Data Error", error);
    });
};
export default send;