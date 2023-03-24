import { useState } from "react";

import { Button } from "../Button";
import CustomModal from "../CustomModal";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

const SignInButton = () => {
  const [isLoginOpen, toggleLogin] = useState(false);
  const [isRegisterFormOpen, toggleRegisterForm] = useState(false);

  return (
    <>
      <Button variant="default" onClick={() => toggleLogin(true)}>
        Sign In
      </Button>
      <CustomModal isOpen={isLoginOpen} onClose={() => toggleLogin(false)}>
        <LoginForm
          toggleLogin={toggleLogin}
          toggleRegisterForm={toggleRegisterForm}
        />
      </CustomModal>
      <CustomModal
        isOpen={isRegisterFormOpen}
        onClose={() => toggleRegisterForm(false)}
      >
        <RegisterForm
          toggleLogin={toggleLogin}
          toggleRegisterForm={toggleRegisterForm}
        />
      </CustomModal>
    </>
  );
};

export default SignInButton;
