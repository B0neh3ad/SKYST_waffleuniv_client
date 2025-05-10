"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// 타입 정의
interface UserColorContextType {
  userColor: string;
  setUserColor: (color: string) => void;
}

const UserColorContext = createContext<UserColorContextType | undefined>(
  undefined
);

export function useUserColor() {
  const ctx = useContext(UserColorContext);
  if (!ctx)
    throw new Error("useUserColor must be used within a UserColorProvider");
  return ctx;
}

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userColor, setUserColor] = useState("#");
  return (
    <UserColorContext.Provider value={{ userColor, setUserColor }}>
      {children}
    </UserColorContext.Provider>
  );
}
