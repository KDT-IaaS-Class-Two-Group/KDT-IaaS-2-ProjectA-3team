const noticeDelete = (id: string) => {
  return fetch(`http://localhost:3001/notice/${id}`, {
    method: "DELETE",
    credentials: "include",
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
    window.location.href = "/noticeMain";
  })
  .catch(err => {
    console.error(err);
    alert("삭제 중 오류 발생");
    window.location.href = "/noticeMain";
  });
};

export default noticeDelete;
