import clsx from "clsx";

type buttonProps = {
  type: "submit" | "reset" | "button" | undefined;
  className?: string;
};

export default function Button(props: buttonProps) {
  let buttonClass = clsx(
    `border p-1 cursor-pointer rounded-md`,
    props.className,
  );
  return (
    <>
      <button type={props.type} className={buttonClass}>
        TEST
      </button>
    </>
  );
}
