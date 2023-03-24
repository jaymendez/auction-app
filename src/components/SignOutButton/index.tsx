import { useUserContext } from "@/context/UserContext";

import { Button } from "../Button";

const SignOutButton = () => {
  const { user, logoutMutation } = useUserContext();

  const handleSignOut = () => {
    logoutMutation(user);
  };

  return (
    <Button variant="ghost" onClick={handleSignOut} className="w-full">
      Sign Out
    </Button>
  );
};

export default SignOutButton;
