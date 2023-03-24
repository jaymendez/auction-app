import { User } from "lucide-react";

import { Button } from "@/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { useUserContext } from "@/context/UserContext";
import { useState } from "react";
import AddBalanceModal from "../AddBalanceModal";
import AddItemModal from "../AddItemModal";
import SignOutButton from "../SignOutButton";

export interface IUserMenuProps {}

export default function UserMenu(props: IUserMenuProps) {
  const { user } = useUserContext();
  const [isBalanceModalOpen, toggleBalanceModal] = useState(false);
  const [isItemModalOpen, toggleItemModal] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <User className="rotate-90 transition-all hover:text-slate-900 dark:rotate-0  dark:text-slate-400 dark:hover:text-slate-100" />
            <span className="sr-only">User</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" forceMount>
          <DropdownMenuItem className="focus:!bg-transparent">
            <span className="dark:text-slate-200 font-semibold text-slate-900 max-w-[200px] truncate">
              {user?.email}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:!bg-transparent">
            <span className="dark:text-slate-200 text-slate-900 max-w-[200px] truncate">
              Balance: <span className="font-normal">${user?.moneyAmount}</span>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleBalanceModal(true)}>
            <span className="dark:text-slate-200 text-slate-900">
              Add Balance
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleItemModal(true)}>
            <span className="dark:text-slate-200 text-slate-900">Add Item</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0.5 justify-center items-center focus:!bg-transparent">
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isBalanceModalOpen && (
        <AddBalanceModal
          isOpen={isBalanceModalOpen}
          toggleModal={toggleBalanceModal}
        />
      )}
      {isItemModalOpen && (
        <AddItemModal isOpen={isItemModalOpen} toggleModal={toggleItemModal} />
      )}
    </>
  );
}
