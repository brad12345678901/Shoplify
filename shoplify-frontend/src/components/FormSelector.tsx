import { useEffect, useRef, useState } from "react";
import type { OptionsType } from "../types/OptionsType";

type FormSelectorTypes = {
  type?: string;
  id?: string;
  value?: any;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  label?: string;
  labelClassName?: string;
  options?: Array<OptionsType>;
};

export default function FormSelector(props: FormSelectorTypes) {
  const [selected, setSelected] = useState(null);
  const [openSelector, setOpenSelector] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  function openSelectMenu() {
    setOpenSelector(!openSelector);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={wrapperRef} className="flex relative">
        <div
          className="border min-h-10 w-full rounded-md cursor-pointer place-content-center px-2"
          onClick={openSelectMenu}
        >
          <p>{props.placeholder ? props.placeholder : "Select Item"}</p>
        </div>
        {openSelector && (
          <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-md shadow-lg max-h-50 overflow-y-auto z-50">
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Option 1</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Option 2</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Option 2</div>

            <div className="p-2 hover:bg-gray-100 cursor-pointer">Option 2</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Option 2</div>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">Option 2</div>
          </div>
        )}
      </div>
    </>
  );
}
