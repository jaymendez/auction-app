import { isEmpty } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";

import AddBidToLot from "@/api/lot/addBidToLot";
import { useUserContext } from "@/context/UserContext";
import { ILot, ModalProps } from "@/types";
import { getActiveBid, getCurrentPrice } from "@/utils/bid";

import { Button } from "../Button";
import CustomModal from "../CustomModal";
import FormErrors from "../FormErrors";
import { Input } from "../Input";
import Label from "../Label";
import { toast } from "../Toast";

type AddBidModalProps = {
  refetchLots: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  item?: ILot;
} & ModalProps;

const AddBidModal = ({
  isOpen,
  toggleModal,
  refetchLots,
  item,
}: AddBidModalProps) => {
  const [bidValue, setBidValue] = useState<number | string>(0);
  const [errors, setErrors] = useState<string[]>([]);
  const { user, refetchUser } = useUserContext();

  const { mutate } = useMutation(AddBidToLot, {
    onSuccess: () => {
      refetchLots();
      refetchUser?.();
      toast({
        title: "Successful bid!! 🎉",
        message: `Item ${item?.name} has your bid.`,
        type: "success",
      });
      setBidValue(0);
      toggleModal(false);
    },
    onError: (error) =>
      setErrors((prev) => {
        if (prev.includes(error as string)) {
          return prev;
        }
        return [...prev, error as string];
      }),
  });

  const addBid = useCallback(() => {
    if (item && errors.length === 0) {
      mutate({
        lotId: item._id,
        body: {
          userId: user?._id,
          lotId: item._id,
          transactionAmount: bidValue,
        },
      });
    }
  }, [bidValue, user, item, mutate, errors]);

  const isTheActiveBidder = useMemo(() => {
    if (item) {
      if (getActiveBid(item)?.userId === user?._id) {
        return true;
      }
      return false;
    }
    return true;
  }, [item, user]);

  const validateForm = useCallback(() => {
    if (isTheActiveBidder) {
      const err = `You're the highest bidder, so you don't need to bid for now.`;
      setErrors((prev) => {
        if (prev.includes(err)) {
          return prev;
        }
        return [...prev, err];
      });
      return;
    }
    if (item) {
      if (
        (typeof bidValue === "string" && isEmpty(bidValue)) ||
        (typeof bidValue === "number" && bidValue <= getCurrentPrice(item))
      ) {
        const valError = "Your bid should be greater than the current price";
        setErrors((prev) => {
          if (prev.includes(valError)) {
            return prev;
          }
          return [...prev, valError];
        });
        return;
      }
    }
    setErrors([]);
  }, [isTheActiveBidder, item, bidValue]);

  useEffect(() => {
    validateForm();
  }, [validateForm, bidValue]);

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={() => toggleModal(false)}
      cardSx={{ maxWidth: "450px" }}
    >
      <div className="space-y-4 flex flex-col">
        {item && (
          <div>
            <h3 className="text-xl break-words text-stone-900 text-s dark:text-stone-100">
              Bid {item.name}
            </h3>
            <h3 className="text-md text-stone-900 dark:text-stone-100">
              Current Price: ${getCurrentPrice(item)}
            </h3>
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="bidValue" className="flex">
            Bid Price
          </Label>
          <Input
            step={5}
            name="bidValue"
            type="number"
            value={bidValue}
            className="mt-1 block w-full"
            min={0}
            max={1000}
            onChange={(event) => setBidValue(parseFloat(event.target.value))}
            autoFocus
            required
            disabled={isTheActiveBidder}
          />
        </div>
        <FormErrors errors={errors} />
        <Button
          variant="default"
          type="submit"
          className="max-w-[150px] self-end"
          onClick={() => addBid()}
          disabled={bidValue === 0 || bidValue === "" || isTheActiveBidder}
        >
          Add Bid
        </Button>
      </div>
    </CustomModal>
  );
};

export default AddBidModal;
