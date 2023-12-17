import React, { useState } from "react";
import { default as NextImage } from "next/image";
import { ImageWithFallbackProps } from "./type";

export const Image = ({
  alt = "",
  src,
  blurHash,
  ...props
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <NextImage
      {...props}
      style={{
        height: props.height,
        ...props.style,
      }}
      alt={alt ?? ""}
      src={imgSrc}
      placeholder={!!blurHash?.length ? "blur" : "empty"}
      blurDataURL={blurHash}
      onError={() => {
        setImgSrc(
          "https://craftypixels.com/placeholder-image/400x400/e8e8e8/e8e8e8"
        );
      }}
    />
  );
};

export default Image;
