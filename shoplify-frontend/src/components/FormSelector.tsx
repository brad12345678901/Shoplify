import { useEffect, useRef, useState } from "react";
import type { OptionsType } from "../types/OptionsType";
import { useCategory } from "../store/hooks/useCategoryStore";
import { ClipLoader, SyncLoader } from "react-spinners";

type FormSelectorTypes = {
  name: string;
  id?: string;
  value: any;
  placeholder?: string;
  onChange?: any;
  inputClassName?: string;
  label?: string;
  labelClassName?: string;
  options?: Array<OptionsType>;
  optionsLoading?: boolean;
  parentmodalShow?: boolean;
};

export default function FormSelector(props: FormSelectorTypes) {
  const [selected, setSelected] = useState<string>("");
  const [openSelector, setOpenSelector] = useState<boolean>(false);

  const { fetchCategories } = useCategory();

  const wrapperRef = useRef<HTMLDivElement>(null);

  function handleSelectMenu() {
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

  useEffect(() => {
    if (!props.parentmodalShow)
      setTimeout(() => {
        setSelected("");
      }, 200);
  }, [props.parentmodalShow]);

  useEffect(() => {
    if (openSelector) fetchCategories();
  }, [openSelector]);

  return (
    <>
      <div ref={wrapperRef} className="flex relative">
        <div
          className="border min-h-10 w-full rounded-md cursor-pointer place-content-center px-2"
          onClick={handleSelectMenu}
        >
          <p>
            {selected
              ? selected
              : props.placeholder
                ? props.placeholder
                : "Select Item"}
          </p>
        </div>
        {openSelector && (
          <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-md shadow-lg max-h-50 overflow-y-auto z-50">
            {props.optionsLoading ? (
              <div className="p-2 text-center pointer-events-none">
                <ClipLoader size={16} />
              </div>
            ) : props.options !== undefined && props.options?.length !== 0 ? (
              props.options?.map((option) => (
                <div
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  key={option.value}
                  onClick={() => {
                    props.onChange({
                      target: {
                        name: props.name,
                        value: option.value,
                      },
                    });
                    handleSelectMenu();
                    setSelected(option.name);
                  }}
                >
                  {option.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-center pointer-events-none">
                No Options Available
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
