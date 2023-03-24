import AddBidToLot from "@/api/lot/addBidToLot";
import { useUserContext } from "@/context/UserContext";
import { ILot, ModalProps } from "@/types";
import { getActiveBid, getCurrentPrice } from "@/utils/bid";
import { isEmpty } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";
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
  const { user } = useUserContext();

  const { mutate } = useMutation(AddBidToLot, {
    onSuccess: () => {
      refetchLots();
      toast({
        title: "Successful bid!! 🎉",
        message: `Item ${item?.name} has your bid.`,
        type: "success",
      });
      setBidValue(0);
      toggleModal(false);
    },
  });

  const addBid = useCallback(() => {
    if (item && errors.length === 0) {
      mutate({
        lotId: item._id,
        body: {
          userId: user._id,
          lotId: item._id,
          transactionAmount: bidValue,
        },
      });
    }
  }, [bidValue, user, item, mutate, errors]);

  const isTheActiveBidder = useMemo(() => {
    if (item) {
      if (getActiveBid(item)?.userId === user._id) {
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
      if (bidValue <= getCurrentPrice(item) || isEmpty(bidValue)) {
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
  }, [validateForm]);

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={() => toggleModal(false)}
      cardSx={{ maxWidth: "450px" }}
    >
      <div className="space-y-4 flex flex-col">
        <h3 className="text-lg">Bid {item?.name}</h3>
        <div className="space-y-1.5">
          <Label htmlFor="bidValue" className="flex">
            Bid Price
          </Label>

          <Input
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
