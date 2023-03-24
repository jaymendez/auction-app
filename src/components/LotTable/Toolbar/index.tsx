import { useUserContext } from "@/context/UserContext";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { isEmpty } from "lodash";

type TableToolbarProps = {
  value: string;
  handleChange: any;
};

const TableToolbar = ({ value, handleChange }: TableToolbarProps) => {
  const { user } = useUserContext();

  return (
    <ToggleButtonGroup
      color="primary"
      value={value}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="personal" disabled={isEmpty(user)}>
        My Listing
      </ToggleButton>
      =
    </ToggleButtonGroup>
  );
};

export default TableToolbar;
