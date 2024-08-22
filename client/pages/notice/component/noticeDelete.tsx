const noticeDelete = (id: string) => {
  return fetch(`http://localhost:3001/notice/${id}`, {
    method: "DELETE",
    credentials: "include",
  }).then(response => response.text());
};

export default noticeDelete;
