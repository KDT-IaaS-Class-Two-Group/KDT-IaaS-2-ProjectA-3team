// issue_id | issue_name | status | project_name | user_id

// [ ] get issue/id
// [ ] post issue/create
//
//
// http://localhost:3001/issue
const getFetchTest = async () => {
  const da2ta = '칸반더미'
  const res = await fetch(`http://localhost:3001/issue/${da2ta}`);
  const data = await res.json();
  console.log(data);
};

const postFetchTest = async () => {
  const res = await fetch("http://localhost:3001/issue/create", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      issue_name: "이슈테스트",
      project_name: "칸반더미",
    }),
  });
};

const MyTest = () => {
  return (
    <div>
      <button
        onClick={() => {
          postFetchTest();
        }}
      >
        {" "}
        create
      </button>
      <button
        onClick={() => {
          getFetchTest();
        }}
      >
        유저 004 get
      </button>
    </div>
  );
};

export default MyTest;
