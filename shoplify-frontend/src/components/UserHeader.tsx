import ShoplifyLogo from "../assets/shoplify logo text white.png";
import { MdAccountCircle } from "react-icons/md";
import FormInput from "./FormInput";
import { BsCart4 } from "react-icons/bs";

export default function UserHeader() {
  return (
    <>
      <div className="fixed top-0 z-10 rounded-b-sm text-white bg-black flex w-full min-h-20 px-20 items-center justify-between">
        <img className="w-80 h-20 place-self-center" src={ShoplifyLogo} />
        <div>
          <FormInput
          name = "search"
          placeholder = "Search to find your Item"
          inputClassName="w-[40vw]"
          noLabel
          onChange={() => {}}
          />
        </div>
        <div className="flex flex-row">
          <MdAccountCircle size={30} /> <p>Login</p>
        </div>
        <div>
          <BsCart4 size={40}/>
        </div>
      </div>
    </>
  );
}
