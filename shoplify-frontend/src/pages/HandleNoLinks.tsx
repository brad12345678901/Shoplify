import pandaImage from "../assets/404 panda image.png";

export default function HandleNoLinks () {
    return (
        <div className = "bg-gray-500 w-dvw h-dvh text-white flex justify-center items-center">
            <div className = "w-[50dvw] h-[50dvh] flex flex-col gap-5 justify-center items-center">
                <img src={pandaImage}/>
                <p className = "font-extrabold">Your Path leads to nothing...</p>
            </div>
        </div>
    );
}