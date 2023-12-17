import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { setCookie } from "cookies-next";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/router";
import { Button, EmailInput, Image, Input, PasswordInput } from "@/UI";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { classNames } from "@/utils";
import { useRegister } from "@/services/Hooks";
const getColor = (props: any) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 50%;
  border-color: ${(props: any) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  width: 150px;
  min-height: 150px;
  margin: 0 auto;
`;

export default function Register() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    profileImage: "",
  });
  const router = useRouter();
  const { username, email, phoneNumber, password } = formState;

  const [, setUserData] = useLocalStorage("user", {});

  function validation() {
    if (!username || !email || !phoneNumber || !password) {
      return false;
    }
    return true;
  }
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ accept: { "image/*": [] }, maxFiles: 1, maxSize: 2097152 });
  useEffect(() => {
    if (acceptedFiles.length) {
      setFormState({
        ...formState,
        profileImage: URL.createObjectURL(acceptedFiles[0]),
      });
    }
  }, [acceptedFiles]);
  const { mutateAsync: registerFn, isPending } = useRegister();
  console.log(formState);
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col p-6 gap-6 w-[500px] rounded-lg border shadow-sm text-slate-700">
        <h1 className="text-4xl font-semibold text-center mb-3 text-black">
          Register
        </h1>
        <div className="relative w-fit h-fit mx-auto overflow-hidden rounded-full">
          {!!acceptedFiles.length && (
            <Image
              className="absolute top-0 rounded-full h-full z-0"
              fill
              src={`${URL.createObjectURL(acceptedFiles[0])}`}
            />
          )}
          <Container
            className={classNames(
              "z-[10] relative cursor-pointer duration-300",
              !!acceptedFiles.length && "opacity-0 hover:opacity-70"
            )}
            {...getRootProps({ isFocused, isDragAccept, isDragReject })}
          >
            <input {...getInputProps()} />
          </Container>
        </div>
        <Input
          value={username}
          onChange={(e) =>
            setFormState({ ...formState, username: e.target.value })
          }
          label="Username"
        />
        <Input
          label="Phone number"
          value={phoneNumber}
          onChange={(e) =>
            setFormState({ ...formState, phoneNumber: e.target.value })
          }
        />
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
        <div className="flex gap-2 items-center w-full">
          <Button
            loading={false}
            disabled={!validation()}
            className="w-6/12"
            onClick={async () => {
              try {
                const res = await registerFn(formState);
                setCookie("token", res?.token);
                setUserData(res?.user);
                toast.success("تم تسجيل الدخول بنجاح");
                router.push("/chats");
              } catch (error: any) {
                toast.error(JSON.stringify(error?.response?.data?.message));
              }
            }}
          >
            Create a new account
          </Button>
          <Link className="w-6/12" href="/login">
            <Button
              type="dashed"
              className="text-xl font-semibold text-[#3da3f6] m-1 w-full"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
