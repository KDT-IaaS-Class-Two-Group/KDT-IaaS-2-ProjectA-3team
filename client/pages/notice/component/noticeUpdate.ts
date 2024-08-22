const noticeUpdate = (id: string, newTitle: string, newContent: string) => {
  return fetch(`http://localhost:3001/notice/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title: newTitle, content: newContent }),
  }).then(response => response.text());
};

export default noticeUpdate;