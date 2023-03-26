import { CreateLotProps } from "@/api/lot/createLot";
import { ILot, IUser, TAuthUser } from "@/types";
import { AxiosResponse } from "axios";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  UseMutateFunction,
} from "react-query";

type TAuthMutation = UseMutateFunction<
  AxiosResponse<any, any> | never[],
  unknown,
  TAuthUser,
  unknown
>;

export type UserProviderState = {
  user: IUser | null; // Add user type
  setUser: (newUser: any) => void;
  loginMutation: TAuthMutation;
  logoutMutation: TAuthMutation;
  registerMutation: TAuthMutation;
  updateUserMutation: UseMutateFunction<
    AxiosResponse<any, any> | never[],
    unknown,
    {
      userId: string;
      body: Partial<IUser>;
    },
    unknown
  >;
  refetchUser?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
  createLotMutation: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    CreateLotProps,
    unknown
  >;
  updateLotMutation: UseMutateFunction<
    AxiosResponse<any, any>,
    unknown,
    Partial<ILot>,
    unknown
  >;
  refetchLots?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  setRefetchLots: (refetch: any) => void;
};

export const userInitialState: UserProviderState = {
  user: null,
  setUser: () => null,
  loginMutation: () => null,
  logoutMutation: () => null,
  registerMutation: () => null,
  updateUserMutation: () => null,
  refetchUser: undefined,
  createLotMutation: () => null,
  updateLotMutation: () => null,
  refetchLots: undefined,
  setRefetchLots: (fn: any) => null,
};

export type UserAction =
  | {
      type: "SET_USER";
      user: UserProviderState["user"];
    }
  | {
      type: "CLEAR_USER";
      user: null;
    }
  | {
      type: "SET_REFETCH_LOTS";
      refetch: UserProviderState["refetchLots"];
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
    case "SET_REFETCH_LOTS": {
      return {
        ...state,
        refetchLots: action?.refetch,
      };
    }
    default:
      throw new Error(
        "You didn't pass a valid action type to the userReducer!"
      );
  }
};

export default userReducer;
