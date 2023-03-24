import { createContext, ReactElement, useContext } from "react";

import { useUser } from "@/hooks/useUser";
import { userInitialState, UserProviderState } from "@/reducers/userReducer";

export const UserContext = createContext<UserProviderState>(userInitialState);
interface Props {
  children: ReactElement;
}

export const UserContextProvider: any = ({ children }: Props) => {
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
