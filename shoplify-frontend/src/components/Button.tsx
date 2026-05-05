import clsx from "clsx";
import type { ReactNode } from "react";

type buttonProps = {
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
};

export default function Button(props: buttonProps) {
  let buttonClass = clsx(
    `border p-1 cursor-pointer rounded-md`,
    props.className,
  );
  return (
    <>
      <button
        type={props.type ? props.type : "button"}
        className={buttonClass}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  );
}
