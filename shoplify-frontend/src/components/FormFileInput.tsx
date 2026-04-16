import clsx from "clsx";

type FormInputTypes = {
  id?: string;
  name: string;
  value?: any;
  placeholder?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  inputClassName?: string;
  label?: string;
  accept?: string;
  labelClassName?: string;
};

export default function FormFileInput(props: FormInputTypes) {
  return (
    <>
      <div>
        <label className={clsx("font-semibold pr-2", props.labelClassName)}>
          {props.label ? props.label : "Label"}
        </label>
        <input
          className={clsx(
            `border rounded-md outline-none ring-0 focus:outline-none focus:ring-0 p-2`,
            props.inputClassName,
          )}
          type="file"
          value={props.value}
          name={props.name}
          id={props.id}
          placeholder={props.placeholder}
          ref={props.inputRef as React.Ref<HTMLInputElement>}
          accept={props.accept}
          onChange={props.onChange}
        />
      </div>
    </>
  );
}
