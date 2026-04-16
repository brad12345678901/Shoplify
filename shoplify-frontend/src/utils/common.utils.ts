
export function handleChangeFunction(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    console.log(name, value);
}

export const getCroppedImg = (imageSrc: any, crop: any) => {
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