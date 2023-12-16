import React, { forwardRef } from "react";
import { Input as AntdInput, InputRef } from "antd";
import { NormalInputProps } from "./type";
import { classNames } from "../../utils";

export const Input = forwardRef<InputRef, NormalInputProps>(function Input(
  { label, className, ...props }: NormalInputProps,
  ref
) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <p className="text-2xl font-semibold">{label}</p>}
      <AntdInput
        ref={ref}
        size="large"
        allowClear
        className={classNames(" font-medium h-14 text-lg", className)}
        {...props}
      />
    </div>
  );
});

export default Input;
