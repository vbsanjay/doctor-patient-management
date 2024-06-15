import React, { ImgHTMLAttributes } from "react";

export const LogoImage = (
  props: ImgHTMLAttributes<HTMLImageElement>
): JSX.Element => {
  const { src, ...rest } = props;
  return (
    <img
      src={src}
      alt="logo"
      width={rest?.width ?? "255px"}
      height={rest?.height ?? "150px"}
      {...rest}
    />
  );
};
