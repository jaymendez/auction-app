import { useCallback, useEffect, useReducer } from "react";
import { useMutation, useQuery } from "react-query";

import createLot from "@/api/lot/createLot";
import updateLot from "@/api/lot/updateLot";
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

  const { mutate: loginMutation } = useMutation(login);

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
    fetchCurrentUser,
    {
      onError: (err) => {
        setUser(null);
      },
    }
  );

  const { mutate: updateUserMutation } = useMutation(updateUser, {
    onSuccess: () => refetchUser(),
  });

  const { mutate: createLotMutation } = useMutation(createLot);
  const { mutate: updateLotMutation } = useMutation(updateLot);

  const setUser = useCallback((newUser: any) => {
    dispatch({
      type: "SET_USER",
      user: newUser,
    });
  }, []);

  const setRefetchLots = useCallback((refetch: any) => {
    dispatch({
      type: "SET_REFETCH_LOTS",
      refetch,
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
    updateLotMutation,
    setRefetchLots,
    setUser,
  };
};
