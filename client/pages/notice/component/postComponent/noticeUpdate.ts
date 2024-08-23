const noticeUpdate = (id: string, newTitle: string, newContent: string) => {
  return fetch(`http://localhost:3001/notice/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ title: newTitle, content: newContent }),
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
    window.location.reload();
  })
  .catch(err => {
    console.error(err);
    alert("수정 중 오류 발생");
    window.location.href = "/noticeMain";
  });
};

export default noticeUpdate;