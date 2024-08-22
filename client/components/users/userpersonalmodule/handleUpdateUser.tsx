// handleUpdateUser.tsx
interface User {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export const handleUpdateUser = async (
  userId: string,
  editFields: Partial<User>,
  handleCancelEdit: () => void
) => {
  try {
    const updateuser = {
      user_id: userId,
      ...editFields,
    };

    await fetch("http://localhost:3001/getUser/insertuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateuser),
    });

    console.log("사용자 정보 입력 성공");
    handleCancelEdit();
  } catch (error) {
    console.error("사용자 정보 입력 실패:", error);
  }
};
