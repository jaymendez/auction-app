import { createContext, ReactNode, useContext } from "react";

import { useUser } from "@/hooks/useUser";
import { userInitialState, UserProviderState } from "@/reducers/userReducer";

export const UserContext = createContext<UserProviderState>(userInitialState);
interface Props {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: Props) => {
  const userProviderState = useUser();

  return (
    <UserContext.Provider value={userProviderState}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}
