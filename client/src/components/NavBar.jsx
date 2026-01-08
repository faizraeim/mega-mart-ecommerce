import { general, navBar } from "../data/data"
import { CiMenuFries, CiSearch } from "react-icons/ci";
import { IoIosList } from "react-icons/io";
import { RxPerson } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router";
import MiniBar from "./MiniBar";
// import logoWithText from "../img/MegaMartLogoText.png"


function NavBar() {
    return (
        <>
            <MiniBar />
            <div className="flex py-6 mx-auto justify-between max-w-7xl">
                {/* main logo on right */}
                <div className="text-3xl font-bold text-primary flex justify-center items-center ">
                    {/* <Link to="/" className="flex items-center">
                        <span className="bg-primary/10 p-2 rounded-lg mr-3 "><CiMenuFries /></span>
                        <h1>{navBar.logo}</h1>
                    </Link> */}
                    <div className="w-3xs">
                    <Link to="/">
                        <img src={general.logoWithText} className="" />
                    </Link>
                    </div>
                </div>
                <div className="flex flex-2 justify-end items-center ">
                    {/* search bar in middle */}
                    <div className="flex justify-center items-center bg-primary/10 px-4 py-3 rounded-lg">
                        <span className="text-primary mr-2"><CiSearch size={20} /></span>
                        <input className="text-sm text-heading w-sm  " type="text" placeholder={navBar.search} />
                        <span className="text-primary ml-4 "><IoIosList size={20} /></span>
                    </div>
                    {/* sign in and card or left */}
                    <div className="flex justify-center items-center gap-2 ml-6">
                        <Link to="/signin" className="flex  items-center gap-2">
                            <RxPerson size={20} className="text-primary" />
                            <p className="font-medium text-text border-r pr-4 mr-4 border-line ">{navBar.signin}</p>
                        </Link>
                        <Link to="/cart" className="flex items-center gap-2">
                            <FiShoppingCart size={20} className="text-primary" />
                            <p className="font-medium text-text">{navBar.cart}</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NavBar