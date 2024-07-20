import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AppContext } from "../context/Context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <header className="w-full bg-blue-500 mx-auto ">
      <div className="head max-w-3xl flex items-center justify-between gap-2  py-5 px-2 mx-auto">
        <nav className="flex items-center gap-4 text-white font-medium ">
          <Link
            to="/members"
            className="cursor-pointer hover:underline hover:scale-110 transition-all duration-300 ease-linear "
          >
            View Members
          </Link>
          <Link
            to="/"
            className="cursor-pointer hover:underline hover:scale-110 transition-all duration-300 ease-linear"
          >
            Add Members
          </Link>
          <buton
            onClick={() => {
              logout, navigate("/login");
            }}
            className="cursor-pointer bg-red-500 px-4 py-1 rounded-lg hover:underline hover:scale-110 transition-all duration-300 ease-linear"
          >
            Sign Out
          </buton>
        </nav>

        <p className="hidden md:flex text-white">
          welcome back{" "}
          <span className="font-medium capitalize pl-1"> {user}</span>
        </p>
      </div>
    </header>
  );
};

export default Header;
