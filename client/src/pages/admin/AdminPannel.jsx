import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

function AdminPannel() {
  const navRef = useRef(null);
  const [pathName, setPathName] = useState("");
  const barHandler = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("max-md:translate-x-[-400px]");
      navRef.current.classList.toggle("translate-x-0");
    }
  };

  const location = useLocation();
  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);
  return (
    <div className="md:flex max-md:relative">
      <div className="md:hidden ml-2">
        <i
          className="fa-solid fa-bars text-xl cursor-pointer"
          onClick={barHandler}
        ></i>
      </div>
      <div
        ref={navRef}
        className="z-50 border-r border-gray-500 h-screen max-md:absolute bg-black flex-shrink-0 mr-2 max-md:translate-x-[-400px] admin_menu max-md:top-0"
      >
        <li className="flex justify-end md:hidden">
          <i className="fa-solid fa-x pt-2 pr-2 cursor-pointer" onClick={barHandler}></i>
        </li>
        <menu className="text-lg px-2 py-4">
          <li>
            <NavLink
              to="/admin"
              className={`${
                pathName === "/admin" && "bg-[#3d3d41]"
              } px-2 py-1 rounded-md w-full`}
            >
              <i className="fa-solid fa-list"></i> Dashboard
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to="/admin/orderslist"
              className={({ isActive }) =>
                `${isActive && "bg-[#3d3d41]"} px-2 py-1 rounded-md w-full`
              }
            >
              <i className="fa-solid fa-clipboard"></i> Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/userslist"
              className={({ isActive }) =>
                `${isActive && "bg-[#3d3d41]"} px-2 py-1 rounded-md w-full`
              }
            >
              <i className="fa-solid fa-user"></i> Customers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/productslist"
              className={({ isActive }) =>
                `${isActive && "bg-[#3d3d41]"} px-2 py-1 rounded-md w-full`
              }
            >
              <i className="fa-solid fa-bag-shopping"></i> Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/couponslist"
              className={({ isActive }) =>
                `${isActive && "bg-[#3d3d41]"} px-2 py-1 rounded-md w-full`
              }
            >
              <i className="fa-solid fa-receipt"></i> Coupons
            </NavLink>
          </li>
        </menu>
      </div>
      <div className="w-full px-2">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPannel;
