import { useState, useRef } from "react";
import Cropper from "react-easy-crop";

type DebugPictureProps = {
    show:boolean;
    onClose: () => void;
}

export default function DebugAddPictureModal ({ show, onClose }:DebugPictureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [showCrop, setShowCrop] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  // 📥 file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setImageSrc(preview);
    setShowCrop(true);
  };

  // ✂️ crop function
  const getCroppedImg = (imageSrc: string, crop: any) => {
    return new Promise<Blob>((resolve) => {
      const image = new Image();
      image.src = imageSrc;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        canvas.width = crop.width;
        canvas.height = crop.height;

        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        );

        canvas.toBlob((blob) => {
          resolve(blob!);
        }, "image/jpeg");
      };
    });
  };

  // ✅ apply crop
  const handleApplyCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
    setCroppedBlob(blob);

    setShowCrop(false);

    // reset file input so same file can be reselected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 🚀 submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (croppedBlob) {
      formData.append("file", croppedBlob);
    }

    console.log("Submitting with file:", croppedBlob);

    onClose();
  };

  if (!show) return null;

  return (
    <>
      {/* MAIN MODAL */}
      <div
        className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-xl w-125"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-semibold mb-4">Add Product</h2>

          <form onSubmit={handleSubmit}>
            {/* FILE INPUT */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            {/* PREVIEW */}
            {croppedBlob && (
              <img
                src={URL.createObjectURL(croppedBlob)}
                className="mt-4 w-32 h-32 object-cover"
              />
            )}

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* CROP MODAL */}
      {showCrop && imageSrc && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-60">
          <div className="bg-white p-4 rounded-xl w-125">
            <div className="relative w-full h-80">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, croppedAreaPixels) =>
                  setCroppedAreaPixels(croppedAreaPixels)
                }
              />
            </div>

            <button
              onClick={handleApplyCrop}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Apply Crop
            </button>
          </div>
        </div>
      )}
    </>
  );
}