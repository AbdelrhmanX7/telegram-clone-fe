import React, { useState } from "react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";
import { Button, EmailInput, PasswordInput, Image } from "@/UI";

type LoginFormType = {
  email: string;
  password: string;
  isTeacher: boolean;
};

export default function Login() {
  const router = useRouter();
  const [formState, setFormState] = useState<LoginFormType>({
    email: "",
    password: "",
    isTeacher: false,
  });
  const [, setUserData] = useLocalStorage("user", {});
  const { email, password } = formState;
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
        <Button
          isLoading={false}
          disabled={!email || !password}
          type="primary"
          // onClick={async () => {
          //   try {
          //     const res = await loginFn(formState);
          //     setCookie("token", res?.token);
          //     setUserData(res?.user);
          //     toast.success("تم تسجيل الدخول بنجاح");
          //     router.push("/");
          //   } catch (error: any) {
          //     toast.error(error?.response?.data);
          //   }
          // }}
        >
          Login
        </Button>
        <Link className="text-lg font-medium underline w-fit" href="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
