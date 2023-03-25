import LotTable from "@/components/LotTable";
import TableToolbar, { TFilterValue } from "@/components/LotTable/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import { useState } from "react";

const HomeView = () => {
  const { theme: applicationTheme } = useTheme();
  const darkTheme = createTheme({
    palette: {
      mode: applicationTheme === "light" ? "light" : "dark",
    },
  });
  const [filter, setFilter] = useState<TFilterValue>({
    fetchType: "all",
    status: "all",
  });

  return (
    <div className="container pt-20 space-y-10">
      <ThemeProvider theme={darkTheme}>
        <TableToolbar
          value={filter}
          handleToggleChange={(_, value) =>
            setFilter((prev) => ({ ...prev, fetchType: value }))
          }
          handleDropdownChange={(event) =>
            setFilter((prev: any) => ({ ...prev, status: event.target.value }))
          }
        />
        <LotTable filter={filter} />
      </ThemeProvider>
    </div>
  );
};

export default HomeView;
