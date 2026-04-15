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
  inputClassName?: string;
  label?: string;
  labelClassName?: string;
};

export default function FormInput(props: FormInputTypes) {
  if (props.type != "textarea")
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
            type={props.type}
            value={props.value}
            name={props.name}
            id={props.id}
            placeholder={props.placeholder}
            onChange={props.onChange}
          />
        </div>
      </>
    );
  else
    return (
      <>
        <div>
          <label className={clsx("font-semibold pr-2", props.labelClassName)}>
            {props.label ? props.label : "Label"}
          </label>
          <textarea
            className={clsx(
              `border rounded-md outline-none ring-0 focus:outline-none focus:ring-0 p-2`,
              props.inputClassName,
            )}
            value={props.value}
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            onChange={props.onChange}
          />
        </div>
      </>
    );
}
