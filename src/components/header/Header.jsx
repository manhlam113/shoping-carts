import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
const Header = () => {
  const { user } = useSelector((state) => state.stateUser);
  const { carts } = useSelector((state) => state.stateProduct);

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(true);
  const menuSidebarRef = useRef(null);
  useEffect(() => {
    function handleClickDocument(e) {
      if (menuSidebarRef && !menuSidebarRef.current.contains(e.target)) {
        setShowMenu(true);
      }
    }
    function handleMouseOver(e) {
      if (menuSidebarRef && !menuSidebarRef.current.contains(e.target)) {
        setShowMenu(true);
      }
    }
    document.addEventListener("click", handleClickDocument);
    document.addEventListener("mouseover", handleMouseOver);
    return () => {
      document.removeEventListener("click", handleClickDocument);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  let cartTemp = Object.values(carts);

  let numberProduct = cartTemp.slice(1, cartTemp.length).length;

  const handleToCart = () => {
    navigator("/cart");
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  console.log(showMenu);
  return (
    <>
      <div
        className="header sm:px-4 bg-white shadow-md p-4 sm:p-0"
        ref={menuSidebarRef}
      >
        <nav className="md:flex md:justify-between py-2 md:items-center">
          <div className="header-right flex justify-between items-center">
            <NavLink
              to={"/home"}
              className=" text-primary text-2xl font-bold w-1/3"
            >
              Beauty.bd
            </NavLink>
            <button className="md:hidden" onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <ul
            className={`main-menu md:flex md:items-center md:justify-between z-[100] left-0
           bg-white w-full md:z-auto md:static absolute md:w-auto md:opacity-100 transition-all ${
             showMenu ? "hidden" : "block"
           }`}
          >
            <li className="menu-item mx-4 my-6 md:my-0">
              <NavLink
                to="/home"
                className="menu-link text-primary text-lg hover:text-opacity-10 font-semibold"
              >
                Home
              </NavLink>
            </li>
            <li className="menu-item mx-4 my-6 md:my-0">
              <NavLink
                to="/products/1"
                className="menu-link text-primary text-lg hover:text-opacity-10 font-semibold"
              >
                Products
              </NavLink>
            </li>
            <li className="menu-item mx-4 my-6 md:my-0">
              <NavLink
                to="/reviews"
                className="menu-link text-primary text-lg hover:text-opacity-10 font-semibold"
              >
                Reviews
              </NavLink>
            </li>

            <div className="header-button md:flex md:items-center md:ml-0 ml-3">
              <button
                onClick={handleToCart}
                className="cart w-1/3 sm:flex justify-end relative mr-2"
              >
                {!numberProduct ||
                numberProduct === -1 ||
                numberProduct === 0 ? (
                  <></>
                ) : (
                  <span className="bg-red-500 rounded-full leading-none absolute w-[20px] h-[20px] flex justify-center items-center text-white">
                    {numberProduct}
                  </span>
                )}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </button>
              {user.email ? (
                <NavLink to={"/userinfo"}>
                  <span className="text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-10 h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                </NavLink>
              ) : (
                <div className="">
                  <NavLink className="mr-2 text-primary" to={"/signup"}>
                    SignUp
                  </NavLink>
                  <NavLink className="mr-2 text-primary" to={"/login"}>
                    SignIn
                  </NavLink>
                </div>
              )}
            </div>
          </ul>
        </nav>
      </div>
      <Outlet></Outlet>
    </>
  );
};

export default Header;
