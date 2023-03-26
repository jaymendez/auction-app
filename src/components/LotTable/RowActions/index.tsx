import putTransferLot from "@/api/lot/putTransferLot";
import { Button } from "@/components/Button";
import { toast } from "@/components/Toast";
import { useUserContext } from "@/context/UserContext";
import { ILot } from "@/types";
import { getActiveBid } from "@/utils/bid";
import { Tooltip } from "@mui/material";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";
import { TFilterValue } from "../Toolbar";

const momentDurationFormatSetup = require("moment-duration-format");

momentDurationFormatSetup(moment);
export interface IRowActionsProps {
  row: ILot;
  filter: TFilterValue;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  openItemModal: () => void;
  openBidModal: () => void;
}

export default function RowActions({
  row,
  filter,
  refetch,
  openItemModal,
  openBidModal,
}: IRowActionsProps) {
  const { user, refetchUser } = useUserContext();
  const { auctionTime, status, userId, name } = row;
  const activeBid = getActiveBid(row);
  const { endTime } = auctionTime ?? {
    endTime: "",
  };

  const { mutate } = useMutation(putTransferLot);
  console.log("addbd");

  const handleComplete = () => {
    mutate(
      { ...activeBid },
      {
        onSuccess: () => {
          refetch();
          refetchUser?.();
          toast({
            title: "Congratulations!! 🎉",
            message: `You have successfully sold ${name}.`,
            type: "success",
          });
        },
        onError: (err) => {
          toast({
            title: "Error Encountered",
            message: err as string,
          });
        },
      }
    );
  };

  if (filter.fetchType === "personal") {
    // if duration has elapsed and needs to be completed.
    // For demo purpose, we will force complete even if the duration isn't finished.
    if (status === "published" && !isEmpty(activeBid)) {
      return (
        <Button
          variant="subtle"
          onClick={() => handleComplete()}
          className="font-semibold !bg-green-700 text-white"
        >
          {moment(endTime).diff(moment()) > 0 && "Force"} Complete Bid
        </Button>
      );
    }
    if (status === "draft") {
      return (
        <Button
          variant="subtle"
          onClick={() => openItemModal()}
          className="font-semibold !bg-blue-700 text-white"
        >
          Publish Item
        </Button>
      );
    }
    return <></>;
  }

  return (
    <>
      {status !== "completed" && (
        <Tooltip
          title={
            userId === user?._id
              ? `You can't bid on your own item`
              : "Add bid to the item!"
          }
        >
          <div>
            <Button
              className="font-semibold"
              onClick={() => openBidModal()}
              disabled={userId === user?._id}
            >
              Add Bid
            </Button>
          </div>
        </Tooltip>
      )}
    </>
  );
}
