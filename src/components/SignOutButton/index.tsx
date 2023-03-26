import { useUserContext } from "@/context/UserContext";
import { TAuthUser } from "@/types";

import { Button } from "../Button";

const SignOutButton = () => {
  const { user, logoutMutation } = useUserContext();

  const handleSignOut = () => {
    logoutMutation(user as TAuthUser);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      className="w-full hover:opacity-70"
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
