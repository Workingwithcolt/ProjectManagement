import React, { useContext, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SignOut } from '../userProfile/SignOut'
import { LuHotel } from "react-icons/lu";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { TbBus } from "react-icons/tb";
import { AuthContext } from '../../Auth';
import { UserContext } from '../Contexts/CurrentUserContext';
import { endpoints } from '../../FirebaseHelpers/ApiInterface';
import { useQuery } from '@tanstack/react-query';

function Header() {  
    const { pathname } = useLocation();

    return (
        <nav className="bg-gray-900 border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NavLink to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-base font-semibold whitespace-nowrap text-white">Event Manager</span>
                </NavLink>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <ul className="flex font-sm px-4 mr-4 text-white space-x-2 gap-4">
                        <li >
                            <NavLink to="/roomView">
                                <LuHotel size={25} color={pathname === '/roomView' ? '#3B82F6' : undefined} />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/carView">
                                <TbBus size={25} color={pathname === '/carView' ? '#3B82F6' : undefined} />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/peopleView">
                                <IoPeopleCircleOutline size={25} color={pathname === '/peopleView' ? '#3B82F6' : undefined} />
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