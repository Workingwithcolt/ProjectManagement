import React, { useContext, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SignOut } from '../userProfile/SignOut'
import { GrUserManager } from "react-icons/gr";
import { FaUsersRays } from "react-icons/fa6";
import { GrProjects } from "react-icons/gr";
import { IoIosNotifications } from "react-icons/io";

function Header() {  
    const { pathname } = useLocation();

    return (
        <nav className="bg-gray-900 border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NavLink to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-base font-semibold whitespace-nowrap text-white">Task Manager</span>
                </NavLink>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <ul className="flex font-sm px-4 mr-4 text-white space-x-2 gap-4">
                        <li >
                            <NavLink to="/Managers">
                                <GrUserManager size={25} color={pathname === '/Managers' ? '#3B82F6' : undefined} />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/RequestedUser">
                                <IoIosNotifications size={25} color={pathname === '/RequestedUser' ? '#3B82F6' : undefined} />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/ProjectView">
                                <GrProjects size={25} color={pathname === '/ProjectView' ? '#3B82F6' : undefined} />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/UserView">
                                <FaUsersRays size={25} color={pathname === '/UserView' ? '#3B82F6' : undefined} />
                            </NavLink>
                        </li>
                    </ul>
                    <div
                        type="button"
                        className="flex text-white rounded-full items-center justify-center w-8 h-8"
                    >
                        <SignOut />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header