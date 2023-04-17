import React from "react";
import logo from "../assets/jeletele_logo_blue_main.png";
import { FaBars } from "react-icons/fa";

const Header = ({ user, setUser, newMessage }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const logOut = (e) => {
    e.preventDefault();
    if (!user) {
     window.location = "/auth";
      return;
    }
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    newMessage("success", "Logged out successfully!");
   window.location = "/";
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-dark-blue-bg">
            <div className="container px-4 flex flex-wrap items-center justify-between">
              <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                <a
                  className="text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                  href="/"
                >
                  <img src={logo} className="h-10" />
                </a>
                <button
                  className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent bg-transparent block lg:hidden outline-none focus:outline-none"
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <FaBars />
                </button>
              </div>
              <div
                className={
                  "lg:flex flex-grow items-center" +
                  (menuOpen ? " flex" : " hidden")
                }
                id="example-navbar-info"
              >
                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="/favorites"
                    >
                      Favorites
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 cursor-pointer"
                      onClick={logOut}
                    >
                      {user ? "Logout" : "Login"}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
