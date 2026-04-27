import clsx from "clsx";
import { useEffect, useState } from "react";
import ImageCropper from "./ImageCropper";
import { getCroppedImg } from "../utils/common.utils";
import { ClipLoader } from "react-spinners";

type FormInputTypes = {
  id?: string;
  name: string;
  value?: any;
  placeholder?: string;
  onChange?: any;
  inputRef: React.Ref<HTMLInputElement | HTMLTextAreaElement>;
  inputClassName?: string;
  label?: string;
  accept?: string;
  labelClassName?: string;
  parentmodalShow?: boolean;
};

export default function FormPictureInput(props: FormInputTypes) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [showCrop, setShowCrop] = useState<boolean>(false);
  const [getCropImageLoading, setGetCropImageLoading] =
    useState<boolean>(false);

  const defaultTypes = "image/jpeg, image/png";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = props.accept
      ? props.accept.split(",").map((s) => s.trim())
      : defaultTypes.split(",").map((s) => s.trim());

    if (!allowedTypes.includes(file.type)) {
      alert("File is not an acceptable type");
      e.target.value = "";
      return;
    }

    const preview = URL.createObjectURL(file);
    setImageSrc(preview);
    setShowCrop(true);
  };

  useEffect(() => {
    if (!props.parentmodalShow) {
      setTimeout(() => {
        setImageSrc(null);
        setCroppedBlob(null);
      }, 200);
    }
  }, [props.parentmodalShow]);

  const handleApplyCrop = async (croppedAreaPixels: any) => {
    setShowCrop(false);
    setGetCropImageLoading(true);
    const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
    setGetCropImageLoading(false);
    setCroppedBlob(blob);
    props.onChange({ target: { name: props.name, value: blob } });
  };

  return (
    <>
      <div>
        <div className="relative">
          {croppedBlob && (
            <img
              src={URL.createObjectURL(croppedBlob)}
              className="mt-4 w-50 h-75 object-cover justify-self-center"
            />
          )}
          {getCropImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100/70 z-50">
              <ClipLoader />
            </div>
          )}
        </div>

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
          accept={props.accept ? props.accept : defaultTypes}
          onChange={handleFileChange}
        />
      </div>
      <ImageCropper
        show={showCrop}
        onClose={() => {
          if (
            props.inputRef &&
            "current" in props.inputRef &&
            props.inputRef.current
          ) {
            props.inputRef.current.value = "";
          }
          setShowCrop(false);
        }}
        image={imageSrc}
        applyCrop={handleApplyCrop}
      />
    </>
  );
}
