import Cropper from "react-easy-crop";
import { useState } from "react";

type ImageCropperProps = {
  show: boolean;
  onClose: () => void;
  image: any;
  applyCrop: (croppedAreaPixels: any) => void;
};

export default function ImageCropper(props: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/80 flex items-center justify-center z-60 ${props.show ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={props.onClose}
      >
        <div
          className="bg-white p-4 rounded-xl w-125"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="relative w-full h-80">
            <Cropper
              image={props.image}
              crop={crop}
              zoom={zoom}
              aspect={2/3}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, croppedAreaPixels) =>
                setCroppedAreaPixels(croppedAreaPixels)
              }
            />
          </div>

          <button
            type="button"
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => props.applyCrop(croppedAreaPixels)}
          >
            Apply Crop
          </button>
        </div>
      </div>
    </>
  );
}
