import fetchLots from "@/api/lot/fetchLots";
import { buttonVariants } from "@/components/Button";
import SignInButton from "@/components/SignInButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import UserMenu from "@/components/UserDropdown";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";
import { useQuery } from "react-query";

const Header = () => {
  const { user } = useUserContext();
  const { data } = useQuery([user], fetchLots);
  console.log(data);
  return (
    <header className="fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900/75 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between">
      <div className="container max-w-7xl mx-auto w-full flex justify-between items-center">
        <Link href="/" className={buttonVariants({ variant: "link" })}>
          Auction Web App v1.0
        </Link>

        <div className="flex gap-2">
          <ThemeToggle />
          {user ? <UserMenu /> : <SignInButton />}
        </div>
      </div>
    </header>
  );
};

export default Header;
