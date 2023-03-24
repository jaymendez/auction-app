import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  IconButton,
  Modal,
  SxProps,
  Theme,
} from "@mui/material";
import { X as Close } from "lucide-react";
import { ReactNode } from "react";

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  cardSx?: SxProps<Theme>;
  children: ReactNode;
  className?: string;
};

const CustomModal = ({
  isOpen,
  onClose,
  cardSx,
  children,
  className,
}: CustomModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "12px",
        },
      }}
    >
      <Card
        sx={{
          position: "absolute",
          width: "90%",
          top: "50%",
          right: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "550px",
          maxHeight: "640px",
          ...cardSx,
        }}
        className={cn("dark:bg-slate-800 bg-white")}
      >
        <CardContent sx={{ pt: "50px" }} className={cn(className)}>
          {children}
          <IconButton
            className="text-slate-900 dark:text-slate-100"
            onClick={onClose}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              "& :hover": {
                opacity: "75%",
              },
              m: 1,
              p: 0,
            }}
          >
            <Close />
          </IconButton>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default CustomModal;
