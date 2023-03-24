import LotTable from "@/components/LotTable";
import TableToolbar from "@/components/LotTable/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import { MouseEvent, useState } from "react";

const HomeView = () => {
  const { theme: applicationTheme } = useTheme();
  const darkTheme = createTheme({
    palette: {
      mode: applicationTheme === "light" ? "light" : "dark",
    },
  });
  const [filter, setFilter] = useState<any>({ fetchType: "all" });

  return (
    <div className="container mt-20 space-y-10">
      <ThemeProvider theme={darkTheme}>
        <TableToolbar
          value={filter.fetchType}
          handleChange={(_: MouseEvent<HTMLElement>, value: string) =>
            setFilter((prev: any) => ({ ...prev, fetchType: value }))
          }
        />
        <LotTable filter={filter} />
      </ThemeProvider>
    </div>
  );
};

export default HomeView;
