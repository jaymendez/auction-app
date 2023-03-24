import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import { useTheme } from "next-themes";
import { FormEvent, useCallback, useEffect, useState } from "react";

import { useUserContext } from "@/context/UserContext";
import { ModalProps } from "@/types";
import { isEmpty } from "lodash";
import { Button } from "../Button";
import CustomModal from "../CustomModal";
import FormErrors from "../FormErrors";
import { Input } from "../Input";
import Label from "../Label";
import { toast } from "../Toast";

type AddItemModalProps = ModalProps;

interface FormData {
  name: { value: string };
  startingPrice: { value: string };
}

const AddItemModal = ({ isOpen, toggleModal }: AddItemModalProps) => {
  const { theme: applicationTheme } = useTheme();
  const { createLotMutation, user } = useUserContext();

  const [startDate, setStartDate] = useState<moment.Moment>(moment());
  const [endDate, setEndDate] = useState<moment.Moment | null>(moment());
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
      createLotMutation({
        name: name.value,
        userId: user._id,
        startingPrice: parseFloat(startingPrice.value),
        auctionTime: {
          startTime: (startDate as moment.Moment).toISOString(),
          endTime: (endDate as moment.Moment).toISOString(),
        },
      });

      toast({
        title: "Congratulations! 🎉",
        message: `You have created ${name.value}.`,
        type: "success",
      });
      toggleModal(false);
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
    console.log(endDate?.diff(startDate));
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
          />
        </div>
        <ThemeProvider theme={darkTheme}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <div className="space-y-1.5">
              <Label htmlFor="startingPrice">Start Date</Label>
              <DateTimePicker
                onChange={(v) => v && setStartDate(v)}
                value={startDate}
                sx={{ width: "100%" }}
                disablePast
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
              />
            </div>
          </LocalizationProvider>
        </ThemeProvider>

        <FormErrors errors={errors} />
        <div className=" flex items-center justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </CustomModal>
  );
};

export default AddItemModal;
