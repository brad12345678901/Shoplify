
import ShoplifyLogo from "../assets/shoplify logo text.png";

export default function NavigationHeader() {
    return(<>
    <div className = "sticky flex w-full h-[6vh] align-middle px-20">
        <img src={ShoplifyLogo} width={200} height={200}/>
        <nav className = "pl-5 flex flex-row flex-wrap gap-x-5 content-end">
            <ul>Categories</ul>
            <ul>TEST</ul>
            <ul>TEST</ul>
        </nav>
    </div>
    </>);
};