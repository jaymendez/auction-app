import { Box } from "@mui/material";
import { isEmpty } from "lodash";
import { AlertCircle } from "lucide-react";

interface IFormErrorsProps {
  errors: string[];
  containerClass?: string;
}

const FormErrors = ({ errors, containerClass = "" }: IFormErrorsProps) => {
  if (isEmpty(errors)) {
    return null;
  }
  return (
    <Box
      sx={{
        mt: "16px",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        py: "12px",
        px: "24px",
        gap: "10px",
        borderRadius: "10px",
        backgroundColor: "#ec293b36",
        border: "1px solid #ec293bbf",
      }}
    >
      <AlertCircle className="text-[#ec293b]" />
      <div>
        {errors.map((error, index) => (
          <Box
            key={error}
            sx={{
              display: "flex",
              flexDirection: "column",
              color: "#000",
              fontSize: "14px",
            }}
            className="text-slate-900 dark:text-slate-100"
          >
            {error}
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default FormErrors;
