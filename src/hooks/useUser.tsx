import { useCallback, useEffect, useReducer } from "react";
import { useMutation, useQuery } from "react-query";

import createLot from "@/api/lot/createLot";
import createUser from "@/api/user/createUser";
import fetchCurrentUser from "@/api/user/fetchCurrentUser";
import login from "@/api/user/login";
import logout from "@/api/user/logout";
import updateUser from "@/api/user/updateUser";
import userReducer, {
  userInitialState,
  UserProviderState,
} from "@/reducers/userReducer";

export const useUser = (): UserProviderState => {
  const [state, dispatch] = useReducer(userReducer, userInitialState);
  // const [authCookie, updateCookie, deleteCookie] = useCookie("Authorization");
  // const [value, setValue, remove] = useLocal Storage("auction-user", "");

  const { mutate: loginMutation } = useMutation(login, {
    onSuccess: ({ data }) => {
      setUser(data.data);
      // setUser(data)
    },
  });

  const { mutate: logoutMutation } = useMutation(logout, {
    onSuccess: () => {
      setUser(null);
      // setUser(data)
    },
  });

  const { mutate: registerMutation } = useMutation(createUser, {
    onSuccess: () => {},
  });

  const { data: currentUser, refetch: refetchUser } = useQuery(
    [],
    fetchCurrentUser
  );

  const { mutate: updateUserMutation } = useMutation(updateUser, {
    onSuccess: () => refetchUser(),
  });

  const { mutate: createLotMutation } = useMutation(createLot, {
    onSuccess: () => {},
  });

  const setUser = useCallback((newUser: any) => {
    dispatch({
      type: "SET_USER",
      user: newUser,
    });
  }, []);

  const clearUser = useCallback((newUser: any) => {
    dispatch({
      type: "CLEAR_USER",
      user: newUser,
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser?.data.data);
    }
  }, [currentUser, setUser]);

  return {
    ...state,
    loginMutation,
    logoutMutation,
    registerMutation,
    updateUserMutation,
    refetchUser,
    createLotMutation,
  };
};
