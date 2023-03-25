import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import { useTheme } from "next-themes";
import { FormEvent, useCallback, useEffect, useState } from "react";

import { useUserContext } from "@/context/UserContext";
import { ELotStatus, ILot, ModalProps } from "@/types";
import isEmpty from "lodash/isEmpty";
import { Button } from "../Button";
import CustomModal from "../CustomModal";
import FormErrors from "../FormErrors";
import { Input } from "../Input";
import Label from "../Label";
import { toast } from "../Toast";

type AddItemModalProps = ModalProps & {
  item?: ILot;
};

interface FormData {
  name: { value: string };
  startingPrice: { value: string };
}

const AddItemModal = ({ isOpen, toggleModal, item }: AddItemModalProps) => {
  const { theme: applicationTheme } = useTheme();
  const { createLotMutation, user, refetchLots, updateLotMutation } =
    useUserContext();

  const [startDate, setStartDate] = useState<moment.Moment>(moment());
  const [endDate, setEndDate] = useState<moment.Moment | null>(
    moment().add(8, "h")
  );
  const [errors, setErrors] = useState<string[]>([]);

  const darkTheme = createTheme({
    palette: {
      mode: applicationTheme === "light" ? "light" : "dark",
    },
  });

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, startingPrice } = e.target as typeof e.target & FormData;
    if (errors.length === 0) {
      if (item?._id) {
        // Update Query
        updateLotMutation(
          {
            _id: item?._id,
            auctionTime: {
              startTime: (startDate as moment.Moment).toISOString(),
              endTime: (endDate as moment.Moment).toISOString(),
            },
            status: ELotStatus.PUBLISHED,
          },
          {
            onSuccess: () => {
              refetchLots?.();
              toast({
                title: "Congratulations! 🎉",
                message: `You have published ${item.name}.`,
                type: "success",
              });
              toggleModal(false);
            },
            onError: (error) =>
              setErrors((prev) => {
                if (prev.includes(error as string)) {
                  return prev;
                }
                return [...prev, error as string];
              }),
          }
        );
      } else {
        // Create Query
        createLotMutation(
          {
            name: name.value,
            userId: user._id,
            startingPrice: parseFloat(startingPrice.value),
          },
          {
            onSuccess: () => {
              refetchLots?.();
              toast({
                title: "Congratulations! 🎉",
                message: `You have created ${name.value}.`,
                type: "success",
              });
              toggleModal(false);
            },
            onError: (error) =>
              setErrors((prev) => {
                if (prev.includes(error as string)) {
                  return prev;
                }
                return [...prev, error as string];
              }),
          }
        );
      }
    }
  };

  const validateForm = useCallback(() => {
    if (isEmpty(startDate)) {
      const reqError = "Start date should not be empty";
      setErrors((prev) => {
        if (prev.includes(reqError)) {
          return prev;
        }
        return [...prev, reqError];
      });
      return;
    }
    if (isEmpty(endDate)) {
      const reqError = "End date should not be empty";
      setErrors((prev) => {
        if (prev.includes(reqError)) {
          return prev;
        }
        return [...prev, reqError];
      });
      return;
    }
    if (endDate?.diff(startDate) <= 0) {
      const gtError = "End date should be greater than start date";
      setErrors((prev) => {
        if (prev.includes(gtError)) {
          return prev;
        }
        return [...prev, gtError];
      });
      return;
    }
    setErrors([]);
  }, [endDate, startDate]);

  useEffect(() => {
    validateForm();
  }, [validateForm, endDate, startDate]);

  return (
    <CustomModal isOpen={isOpen} onClose={() => toggleModal(false)}>
      <form onSubmit={submitForm} className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>

          <Input
            id="name"
            name="name"
            type="text"
            className="mt-1 block w-full"
            required
            disabled={!isEmpty(item?._id)}
            defaultValue={item?.name}
          />
        </div>

        {/* Starting Price */}
        <div className="space-y-1.5">
          <Label htmlFor="startingPrice">Starting Price</Label>
          <Input
            id="startingPrice"
            name="startingPrice"
            type="text"
            min="0"
            className="mt-1 block w-full"
            required
            disabled={!isEmpty(item?._id)}
            defaultValue={item?.startingPrice}
          />
        </div>
        {item?._id && (
          <ThemeProvider theme={darkTheme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <div className="space-y-1.5">
                <Label htmlFor="startingPrice">Start Date</Label>
                <DateTimePicker
                  onChange={(v) => v && setStartDate(v)}
                  value={startDate}
                  sx={{ width: "100%" }}
                  disabled
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="startingPrice">End Date</Label>
                <DateTimePicker
                  onChange={(v) => setEndDate(v)}
                  value={endDate}
                  sx={{ width: "100%" }}
                  disablePast
                  minDate={startDate}
                  disabled={isEmpty(item?._id)}
                />
              </div>
            </LocalizationProvider>
          </ThemeProvider>
        )}

        <FormErrors errors={errors} />
        <div className=" flex items-center justify-end">
          <Button type="submit">{item?._id ? "Publish" : "Save Draft"}</Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default AddItemModal;
