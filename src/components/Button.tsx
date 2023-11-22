import React from "react";

type Props = {
  type: "submit" | "button";
  children: React.ReactNode;
};

const Button = ({ type, children }: Props) => {
  return (
    <div>
      <button type={type}>{children}</button>
    </div>
  );
};

export default Button;
