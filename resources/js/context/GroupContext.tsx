import React, { createContext, useContext, useState } from "react";

interface GroupContextProps {
  userExpense: number;
  setUserExpense: React.Dispatch<React.SetStateAction<number>>;
}

const GroupContext = createContext<GroupContextProps | undefined>(undefined);

export const GroupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userExpense, setUserExpense] = useState<number>(0);

  return (
    <GroupContext.Provider value={{ userExpense, setUserExpense }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroupContext = (): GroupContextProps => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroupContext must be used within a GroupProvider");
  }
  return context;
};