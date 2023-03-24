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
import SignOutButton from "../SignOutButton";

export interface IUserMenuProps {}

export default function UserMenu(props: IUserMenuProps) {
  const { user } = useUserContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <User className="rotate-90 transition-all hover:text-slate-900 dark:rotate-0  dark:text-slate-400 dark:hover:text-slate-100" />
          <span className="sr-only">User</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuItem>
          <span className="dark:text-slate-200 text-slate-900">
            {user?.email}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="dark:text-slate-200 text-slate-900">
            Balance: <span className="">$ {user?.moneyAmount}</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="dark:text-slate-200 text-slate-900">
            Balance: <span className="">$ {user?.moneyAmount}</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="dark:text-slate-200 text-slate-900">
            Balance: <span className="">$ {user?.moneyAmount}</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0.5 justify-center items-center">
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
