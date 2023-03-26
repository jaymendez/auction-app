import { useUserContext } from "@/context/UserContext";
import { ModalProps } from "@/types";
import { useCallback, useState } from "react";
import { Button } from "../Button";
import CustomModal from "../CustomModal";
import { Input } from "../Input";
import Label from "../Label";
import { toast } from "../Toast";

type AddBalanceModalProps = ModalProps;

const AddBalanceModal = ({ isOpen, toggleModal }: AddBalanceModalProps) => {
  const [balance, setBalance] = useState<string | number>(0);
  const { updateUserMutation, user } = useUserContext();

  const addBalance = useCallback(() => {
    if (!user) {
      return;
    }
    const parsedBalance =
      typeof balance === "string" ? parseFloat(balance) : balance;
    updateUserMutation({
      userId: user?._id,
      body: { moneyAmount: parsedBalance + user.moneyAmount },
    });
    toast({
      title: "Successful cash in!! 🎉",
      message: `Your new balance is $${user.moneyAmount + parsedBalance}.`,
      type: "success",
    });
    setBalance(0);
    toggleModal(false);
  }, [balance, updateUserMutation, user]);

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={() => toggleModal(false)}
      className="space-y-4 flex flex-col"
    >
      <div className="space-y-1.5">
        <Label htmlFor="balance" className="flex">
          Balance
        </Label>

        <Input
          name="balance"
          type="number"
          value={balance}
          className="mt-1 block w-full"
          min={0}
          max={1000}
          onChange={(event) => setBalance(parseFloat(event.target.value))}
          autoFocus
          required
        />
      </div>
      <Button
        variant="default"
        type="submit"
        className="max-w-[150px] self-end"
        onClick={() => addBalance()}
        disabled={balance === 0 || balance === ""}
      >
        Add Balance
      </Button>
    </CustomModal>
  );
};

export default AddBalanceModal;
