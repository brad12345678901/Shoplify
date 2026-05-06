import clsx from "clsx";
import type { ReactNode } from "react";

type buttonProps = {
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  color?: string;

  //Styles (Order has meaning, if one is higher than the other, the other that's higher is prioritized than the other)
  plain?: boolean;
  outline?: boolean;
};

const styles = {
  base: "border p-1 cursor-pointer rounded-md",
  plain: "border-0 data-active:font-bold",
  outline: "",
};

const color = {
  plain: "text-black",
  default: "text-black",
};

export default function Button(props: buttonProps) {
  const buttonStyle = props.plain ? styles.plain : "";
  let buttonClass = clsx(props.className, buttonStyle, styles.base);
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
