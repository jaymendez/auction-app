import type { FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
// import InputError from "@/components/InputError";
import Label from "@/components/Label";
import { useUserContext } from "@/context/UserContext";
import FormErrors from "../FormErrors";
import { toast } from "../Toast";

type RegisterFormProps = {
  toggleLogin: (bool: boolean) => void;
  toggleRegisterForm: (bool: boolean) => void;
};

const RegisterForm = ({
  toggleLogin,
  toggleRegisterForm,
}: RegisterFormProps) => {
  const { registerMutation } = useUserContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    console.log("test");
    if (password !== passwordConfirmation) {
      if (errors.length === 0) {
        setErrors((prevState) => [
          ...prevState,
          `Please make sure your passwords match.`,
        ]);
      }
      return;
    }
    registerMutation({
      email,
      password,
    });
    setErrors([]);
    toggleRegisterForm(false);
    toast({
      title: "Congratulations! 🎉",
      message: "You have created an account.",
      type: "success",
    });
  };

  return (
    <form onSubmit={submitForm}>
      {/* Email Address */}
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          value={email}
          className="mt-1 block w-full"
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        {/* <InputError messages={errors?.email} className="mt-2" /> */}
      </div>

      {/* Password */}
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          type="password"
          value={password}
          className="mt-1 block w-full"
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="new-password"
        />

        {/* <InputError messages={errors?.password} className="mt-2" /> */}
      </div>

      {/* Confirm Password */}
      <div className="mt-4">
        <Label htmlFor="passwordConfirmation">Confirm Password</Label>

        <Input
          id="passwordConfirmation"
          type="password"
          value={passwordConfirmation}
          className="mt-1 block w-full"
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          required
        />

        {/* <InputError messages={errors?.password_confirmation} className="mt-2" /> */}
      </div>
      <FormErrors errors={errors} />
      <div className="mt-4 flex items-center justify-end">
        <Button
          variant="link"
          onClick={() => {
            toggleLogin(true);
            toggleRegisterForm(false);
          }}
        >
          Already registered?
        </Button>

        <Button>Register</Button>
      </div>
    </form>
  );
};

export default RegisterForm;
