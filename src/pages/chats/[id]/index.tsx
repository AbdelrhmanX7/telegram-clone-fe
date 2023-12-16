import { useRouter } from "next/router";
import React from "react";

export default function ChatsId() {
  const router = useRouter();
  console.log(router?.query?.id);
  return <div>index</div>;
}
