
import ShoplifyLogo from "../assets/shoplify logo text.png";
import { MdAccountCircle } from "react-icons/md";

export default function NavigationHeader() {
    return(<>
    <div className = "sticky top-0 z-10 rounded-b-sm bg-white flex w-full min-h-20 px-20 items-center justify-between">
        <img className = "w-80 h-20 place-self-center" src={ShoplifyLogo}/>
        <nav className = "pl-5 flex flex-row flex-wrap gap-x-5">
            <ul className = "font-bold text-xl">Catalog</ul>
            <ul>About Us</ul>
            <ul>Contact</ul>
        </nav>
        <div>
            <div><MdAccountCircle size={30}/></div>
        </div>
    </div>
    </>);
};