import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Label from "@/components/Label";
import { useUserContext } from "@/context/UserContext";
import FormErrors from "../FormErrors";

type LoginFormProps = {
  toggleLogin: (bool: boolean) => void;
  toggleRegisterForm: (bool: boolean) => void;
};

const Login = ({ toggleLogin, toggleRegisterForm }: LoginFormProps) => {
  const router = useRouter();
  const { loginMutation, setUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>([]);

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    loginMutation(
      {
        email,
        password,
      },
      {
        onError: (error) =>
          setErrors((prev: string[]) => {
            if (prev.includes(error as string)) {
              return prev;
            }
            return [...prev, error];
          }),
        onSuccess: ({ data }: any) => {
          setUser(data.data);
          toggleLogin(false);
        },
      }
    );
  };

  return (
    <>
      <form onSubmit={submitForm}>
        {/* Email Address */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex">
            Email
          </Label>

          <Input
            name="email"
            type="email"
            value={email}
            className="mt-1 block w-full"
            onChange={(event) => setEmail(event.target.value)}
            required
            autoFocus
          />

          {/* <InputError messages={errors?.email} className="mt-2" /> */}
        </div>

        {/* Password */}
        <div className="mt-4 space-y-2">
          <Label htmlFor="password" className="flex">
            Password
          </Label>

          <Input
            id="password"
            type="password"
            value={password}
            className="mt-1 block w-full"
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
          />

          {/* <InputError messages={errors?.password} className="mt-2" /> */}
        </div>
        <FormErrors errors={errors} />
        <div className="mt-4 flex items-center justify-end space-x-3">
          <Button
            variant="link"
            onClick={() => {
              toggleLogin(false);
              toggleRegisterForm(true);
            }}
          >
            Register
          </Button>

          <Button variant="default" type="submit">
            Login
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
