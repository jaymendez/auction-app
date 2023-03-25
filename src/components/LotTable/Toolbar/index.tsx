import { useUserContext } from "@/context/UserContext";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { isEmpty } from "lodash";

export type TFilterValue = {
  fetchType: "all" | "personal";
  status: "all" | "ongoing" | "completed";
};

type TableToolbarProps = {
  value: TFilterValue;
  handleToggleChange: (
    event: React.MouseEvent<HTMLElement>,
    value: TFilterValue["fetchType"]
  ) => void;
  handleDropdownChange: (
    event: SelectChangeEvent<TFilterValue["status"]>,
    child?: any
  ) => void;
};

const TableToolbar = ({
  value,
  handleToggleChange,
  handleDropdownChange,
}: TableToolbarProps) => {
  const { user } = useUserContext();

  return (
    <div className="flex justify-between md:flex-row flex-col gap-5 md:items-center items-end">
      <>
        <ToggleButtonGroup
          color="primary"
          value={value.fetchType}
          exclusive
          onChange={handleToggleChange}
          aria-label="Platform"
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="personal" disabled={isEmpty(user)}>
            My Listing
          </ToggleButton>
        </ToggleButtonGroup>

        <FormControl
          fullWidth
          sx={{
            maxWidth: "200px",
          }}
        >
          <InputLabel id="status">Status</InputLabel>
          <Select
            id="status"
            value={value.status}
            label="Status"
            onChange={handleDropdownChange}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"ongoing"}>Ongoing</MenuItem>
            <MenuItem value={"completed"}>Completed</MenuItem>
          </Select>
        </FormControl>
      </>
    </div>
  );
};

export default TableToolbar;
