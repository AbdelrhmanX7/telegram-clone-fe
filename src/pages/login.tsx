import React, { useState } from "react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";
import { Button, EmailInput, PasswordInput, Image } from "@/UI";
import { useLogin } from "@/services/Hooks";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";

type LoginFormType = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [formState, setFormState] = useState<LoginFormType>({
    email: "",
    password: "",
  });
  const [, setUserData] = useLocalStorage("user", {});
  const { email, password } = formState;
  const { mutateAsync: loginFn, isPending } = useLogin();
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] p-6 flex flex-col gap-7 mt-10 border rounded-lg shadow-md">
        <div className="flex justify-center">
          <h1 className="text-3xl font-semibold">Login</h1>
        </div>
        <EmailInput
          label="Email"
          value={email}
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
        />
        <div className="flex gap-2 items-center">
          <Button
            isLoading={isPending}
            disabled={!email || !password}
            type="primary"
            className="w-6/12"
            onClick={async () => {
              try {
                const res = await loginFn(formState);
                if (!res?.token?.length) toast.error("Something went wrong");
                setCookie("token", res?.token);
                setUserData(res?.user);
                toast.success("Logged in successfully");
                router.push("/chats");
              } catch (error: any) {
                toast.error(error?.response?.data?.message ?? "");
              }
            }}
          >
            Login
          </Button>
          <Link className="w-6/12" href="/register">
            <Button
              type="dashed"
              className="text-xl font-semibold text-[#3da3f6] m-1 w-full"
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
