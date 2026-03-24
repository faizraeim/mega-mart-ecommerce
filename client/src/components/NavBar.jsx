import { useState } from "react";
import { general, navBar } from "../data/data";
import { CiSearch } from "react-icons/ci";
import { IoIosList } from "react-icons/io";
import { RxPerson } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import MiniBar from "./MiniBar";
import { useCart } from "../utils/CartContext";
import auth from "../utils/auth.mjs";

function NavBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const user = auth.getUser();
  const isAuthenticated = auth.isAuthenticated();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <MiniBar />
      <div className="flex py-6 mx-auto justify-between max-w-7xl">
        <div className="text-3xl font-bold text-primary flex justify-center items-center">
          <div className="w-3xs">
            <Link to="/">
              <img src={general.logoWithText} className="" />
            </Link>
          </div>
        </div>
        <div className="flex flex-2 justify-end items-center">
          <form onSubmit={handleSearch} className="flex justify-center items-center bg-primary/10 px-4 py-3 rounded-lg">
            <button type="submit" className="text-primary mr-2">
              <CiSearch size={20} />
            </button>
            <input
              className="text-sm text-heading w-sm bg-transparent outline-none"
              type="text"
              placeholder={navBar.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="text-primary ml-4">
              <IoIosList size={20} />
            </span>
          </form>
          <div className="flex justify-center items-center gap-2 ml-6">
            {isAuthenticated ? (
              <Link to="/dashboard" className="flex items-center gap-2 border-r pr-4 mr-4 border-line">
                <RxPerson size={20} className="text-primary" />
                <p className="font-medium text-text">{user?.username}</p>
              </Link>
            ) : (
              <Link to="/signin" className="flex items-center gap-2">
                <RxPerson size={20} className="text-primary" />
                <p className="font-medium text-text border-r pr-4 mr-4 border-line">
                  {navBar.signin}
                </p>
              </Link>
            )}
            <Link to="/cart" className="flex items-center gap-2 relative">
              <FiShoppingCart size={20} className="text-primary" />
              <p className="font-medium text-text">{navBar.cart}</p>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default NavBar;
