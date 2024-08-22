// handleEditClick.tsx
interface User {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

interface EditFields {
  username?: string;
  birth_date?: string;
  address?: string;
  phone?: string;
  email?: string;
  password?: string;
}

export const handleEditClick = (
  userId: string,
  users: User[],
  setEditingUserId: (id: string | null) => void,
  setEditFields: (fields: Partial<EditFields>) => void
) => {
  setEditingUserId(userId);
  const user = users.find((user) => user.user_id === userId);
  if (user) {
    setEditFields({
      username: user.username,
      birth_date: user.birth_date,
      address: user.address,
      phone: user.phone,
      email: user.email,
      password: user.password,
    });
  }
};
