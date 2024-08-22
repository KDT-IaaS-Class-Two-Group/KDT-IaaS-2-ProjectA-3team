// handleCancelEdit.tsx

import React from "react";


// User 타입 정의
export interface User {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export const handleCancelEdit = (
  setEditingUserId: React.Dispatch<React.SetStateAction<string | null>>,
  setEditFields: React.Dispatch<React.SetStateAction<Partial<User>>>
) => {
  setEditingUserId(null);
  setEditFields({});
};
