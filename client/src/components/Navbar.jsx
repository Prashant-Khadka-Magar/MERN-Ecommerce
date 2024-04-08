import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";

function Navbar() {
  const searchHandler = () => {};
  const [pathName, setPathName] = useState("");
  const [isNavShown, setIsNavShown] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const location = useLocation();
  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);

  const barHandler = () => {
    setIsNavShown((prev) => !prev);
  };


  return (
    <div className="border-b ">
      <menu className="flex justify-between font-semibold text-lg px-2 py-1 items-center w-full max-sm:relative">
        <li>
          <NavLink to="/">
            <img
              src="https://www.gadgetsinnepal.com.np/wp-content/uploads/2023/03/gadgets-in-nepal-logo-white.png"
              alt="company_logo"
              className="h-12"
            />
          </NavLink>
        </li>

        <div className="flex gap-x-4 max-sm:hidden lg:gap-x-8 items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `${!isActive && "text-gray-500"} `}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => `${!isActive && "text-gray-500"} `}
            >
              Products
            </NavLink>
          </li>
          <li className="relative">
            <span className="text-xs rounded-full absolute bg-white text-black w-3 h-3 flex justify-center items-center right-[-10px] top-0">
              1
            </span>
            <NavLink
              to="/cart"
              className={({ isActive }) => `${!isActive && "text-gray-500"} `}
            >
              Cart
            </NavLink>
          </li>
          <li>
            <form onSubmit={searchHandler}>
              <Input
                placeholder="Search..."
                className="bg-[#020817] border-gray-500"
              />
            </form>
          </li>

          {userInfo ? (
            userInfo.isAdmin ? (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={
                      pathName !== "/profile" && !pathName.includes("/admin")
                        ? "text-gray-500"
                        : ""
                    }
                  >
                    Admin
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black text-white border-gray-500 mt-2 mr-2 px-4">
                    <DropdownMenuLabel>Admin Options</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-500" />
                    <DropdownMenuItem>
                      <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                          `${!isActive && "text-gray-500"} `
                        }
                      >
                        <span>Profile</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <NavLink
                        to="admin"
                        className={({ isActive }) =>
                          `${!isActive && "text-gray-500"} `
                        }
                      >
                        <span>Dashboard</span>
                      </NavLink>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `${!isActive && "text-gray-500"} `
                  }
                >
                  Profile
                </NavLink>
              </li>
            )
          ) : (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => `${!isActive && "text-gray-500"} `}
              >
                Login
              </NavLink>
            </li>
          )}
        </div>

        <div className="sm:hidden">
          <i className="fa-solid fa-bars text-xl" onClick={barHandler}></i>
        </div>
        {isNavShown && (
          <nav className="max-sm:absolute z-50 left-0 right-0 top-[60px] sm:hidden bg-white text-red-500 flex flex-col items-start pl-2 py-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => `${!isActive && "text-gray-500"} `}
                onClick={() => setIsNavShown(false)}
              >
                <i className="fa-solid fa-house"></i> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) => `${!isActive && "text-gray-500"} `}
                onClick={() => setIsNavShown(false)}
              >
                <i className="fa-solid fa-bag-shopping"></i> Products
              </NavLink>
            </li>
            <li className="relative">
              <span className="text-xs rounded-full absolute  w-3 h-3 flex justify-center items-center right-[-10px] top-0 bg-black text-white">
                1
              </span>
              <NavLink
                to="/cart"
                className={({ isActive }) => `${!isActive && "text-gray-500"} `}
                onClick={() => setIsNavShown(false)}
              >
                <i className="fa-solid fa-cart-shopping"></i> Cart
              </NavLink>
            </li>
            {userInfo ? (
              userInfo.isAdmin ? (
                <li>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={
                        pathName !== "/profile" && !pathName.includes("/admin")
                          ? "text-gray-500"
                          : ""
                      }
                    >
                      <i className="fas fa-user-plus"></i> Admin
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-black text-white border-gray-500 mt-2 mr-2 px-4">
                      <DropdownMenuLabel>Admin Options</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-500" />
                      <DropdownMenuItem>
                        <NavLink
                          to="/profile"
                          className={({ isActive }) =>
                            `${!isActive && "text-gray-500"} `
                          }
                          onClick={() => setIsNavShown(false)}
                        >
                          <span>
                            <i className="fa-solid fa-user"></i> Profile
                          </span>
                        </NavLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <NavLink
                          to="admin"
                          className={({ isActive }) =>
                            `${!isActive && "text-gray-500"} `
                          }
                          onClick={() => setIsNavShown(false)}
                        >
                          <span>
                            <i className="fa-solid fa-list"></i> Dashboard
                          </span>
                        </NavLink>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ) : (
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `${!isActive && "text-gray-500"} `
                    }
                  >
                    <span>
                    <i className="fa-solid fa-user"></i> Profile
                    
                    </span>
                  </NavLink>
                </li>
              )
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${!isActive && "text-gray-500"} `
                  }
                >
                 <i className="fa fa-sign-in" aria-hidden="true"></i> Login
                </NavLink>
              </li>
            )}
          </nav>
        )}
      </menu>

      <form onSubmit={searchHandler} className="flex gap-x-2 p-2 sm:hidden">
        <Input
          placeholder="Search..."
          className="bg-[#020817] border-gray-500"
        />
        <Button>
          <i className="fa-solid fa-magnifying-glass"></i>
        </Button>
      </form>
    </div>
  );
}

export default Navbar;
