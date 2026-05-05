import clsx from "clsx";

type FormInputTypes = {
  type?: string;
  id?: string;
  name: string;
  value?: any;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  inputRef?: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  inputClassName?: string;
  label?: string;
  noLabel? : boolean;
  accept?: string;
  labelClassName?: string;
};

export default function FormInput(props: FormInputTypes) {
  if (props.type === "file")
    return (
      <>
        <div className = "p-2 border-2 border-red-500 text-red-500 place-items-center">
          <p>ERROR: USE <code>FormFileInput.tsx</code> INSTEAD!</p>
        </div>
      </>
    );
  if (props.type != "textarea")
    return (
      <>
        <div>
          {!props.noLabel && <label className={clsx("font-semibold pr-2", props.labelClassName)}>
            {props.label ? props.label : "Label"}
          </label>}
          <input
            className={clsx(
              `border rounded-md outline-none ring-0 focus:outline-none focus:ring-0 p-2`,
              props.inputClassName,
            )}
            type={props.type}
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
  else
    return (
      <>
        <div>
          {!props.noLabel && <label className={clsx("font-semibold pr-2", props.labelClassName)}>
            {props.label ? props.label : "Label"}
          </label>}
          <textarea
            className={clsx(
              `border rounded-md outline-none ring-0 focus:outline-none focus:ring-0 p-2`,
              props.inputClassName,
            )}
            value={props.value}
            id={props.id}
            name={props.name}
            ref={props.inputRef as React.Ref<HTMLTextAreaElement>}
            placeholder={props.placeholder}
            onChange={props.onChange}
          />
        </div>
      </>
    );
}
