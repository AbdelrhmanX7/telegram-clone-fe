import { useRouter } from "next/router";
import React from "react";

export default function MessagesId() {
  const router = useRouter();
  console.log(router?.query?.id);
  return <div>index</div>;
}
