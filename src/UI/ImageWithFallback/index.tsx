import React, { useEffect, useState } from "react";
import { default as NextImage } from "next/image";
import { dynamicBlurDataUrl } from "../../utils";
import { ImageWithFallbackProps } from "./type";

export const Image = ({ alt = "", src, ...props }: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [blurHash, setBlurHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const modifyImage = async () => {
      setIsLoading(true);
      const data = await dynamicBlurDataUrl(src);
      setBlurHash(data);
      setIsLoading(false);
    };

    modifyImage();
  }, []);
  return (
    <NextImage
      {...props}
      style={{
        height: props.height,
        ...props.style,
      }}
      alt={alt ?? ""}
      src={imgSrc}
      placeholder={!isLoading && blurHash.length ? "blur" : "empty"}
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
