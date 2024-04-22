import Link from "next/link";
import React, { useState, useEffect } from "react";

import Image from "next/image";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState("");

  const [navbarOpen, setNavbarOpen] = useState(false);
  const logoutHandle = () => {
    localStorage.clear();
    router.push("/");
  };
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUser(user.username);
    }
  }, []);

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 bg-gray-200 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <button
              className={`text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none ${
                initialLoad ? "initial-icon-size" : ""
              }`}
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <FaBars />
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item flex">
                <button
                  className="text-red-500 text-2xl mt-1 flex items-center"
                  style={{ width: "150px", height: "62px" }}
                  onClick={logoutHandle}
                >
                  <FaSignOutAlt size={30} className="mr-2" />
                  Logout
                </button>
              </li>
              <li className="nav-item flex">
                <h1 className=" text-red-400 mt-6">{user}</h1>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
