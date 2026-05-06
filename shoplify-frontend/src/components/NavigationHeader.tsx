import ShoplifyLogo from "../assets/shoplify logo text.png";
import { MdAccountCircle } from "react-icons/md";
import Button from "./Button";

type props = {
  activeSection: string;
};

export default function NavigationHeader({ activeSection }: props) {
  const getBlockByActiveSection = (section: string) => {
    switch (section) {
      case "home":
        return "start";
      case "contactus":
        return "end";
      default:
        return "center";
    }
  };
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const block = getBlockByActiveSection(id);
      console.log(block);
      element.scrollIntoView({ behavior: "smooth", block: block });
    }
  };

  return (
    <>
      <div className="fixed top-0 z-10 rounded-b-sm bg-white flex w-full min-h-20 px-20 items-center justify-between">
        <img className="w-80 h-20 place-self-center" src={ShoplifyLogo} />
        <nav className="pl-5 flex flex-row flex-wrap gap-x-10">
          <ul
            onClick={() => handleNavClick("home")}
            className={`cursor-pointer ${activeSection == "home" && "font-bold"}`}
          >
            Home
          </ul>
          <ul
            onClick={() => handleNavClick("catalog")}
            className={`cursor-pointer ${activeSection == "catalog" && "font-bold"}`}
          >
            Catalog
          </ul>
          <ul
            onClick={() => handleNavClick("aboutus")}
            className={`cursor-pointer ${activeSection == "aboutus" && "font-bold"}`}
          >
            About Us
          </ul>
          <ul
            onClick={() => handleNavClick("contactus")}
            className={`cursor-pointer ${activeSection == "contactus" && "font-bold"}`}
          >
            Contact
          </ul>
        </nav>
        <div className="flex flex-row">
          <MdAccountCircle size={30} /> <p>Login</p>
        </div>
      </div>
    </>
  );
}
