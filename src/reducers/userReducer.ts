import { AxiosResponse } from "axios";
import { UseMutateFunction } from "react-query";

export type TUser = {
  email: string;
  password: string;
};

type TAuthMutation = UseMutateFunction<
  AxiosResponse<any, any> | never[],
  unknown,
  { email: string; password: string },
  unknown
>;

export type UserProviderState = {
  user: any; // Add user type
  loginMutation: TAuthMutation;
  logoutMutation: TAuthMutation;
  registerMutation: TAuthMutation;
};

export const userInitialState: UserProviderState = {
  user: null,
  loginMutation: () => null,
  logoutMutation: () => null,
  registerMutation: () => null,
};

export type UserAction =
  | {
      type: "SET_USER";
      user: UserProviderState["user"];
    }
  | {
      type: "CLEAR_USER";
      user: null;
    };

const userReducer = (
  state: UserProviderState,
  action: UserAction
): UserProviderState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "CLEAR_USER": {
      return {
        ...state,
        user: null,
      };
    }
    default:
      throw new Error(
        "You didn't pass a valid action type to the userReducer!"
      );
  }
};

export default userReducer;
