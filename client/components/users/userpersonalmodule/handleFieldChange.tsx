// handleFieldChange.tsx

import React from "react";

export interface User {
  user_id: string;
  username: string;
  birth_date: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export const handleFieldChange = (
  field: keyof User,
  value: string,
  setEditFields: React.Dispatch<React.SetStateAction<Partial<User>>>
) => {
  setEditFields((prevFields) => ({
    ...prevFields,
    [field]: value,
  }));
};