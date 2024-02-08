import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../Auth';
import { endpoints } from '../../FirebaseHelpers/ApiInterface';
import { UserContext } from '../Contexts/CurrentUserContext';
import { useQuery } from '@tanstack/react-query';
import { CURRENTUSER } from '../User/UserConstants';
import { NavLink } from 'react-router-dom';

export function Home() {
  const currentAuthContext = useContext(AuthContext)
  return (
    <section className="bg-gray-900 h-full flex justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">Task Manager</h1>
        <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">Effortlessly organize and coordinate Task with the intuitive Task Manager App.</p>
        <div className="flex flex-row gap-2">
          <NavLink to={`/createUser`} type='button' className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
            Create New User
          </NavLink>
          <NavLink to={`/joinCompany`} type='button' className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
            Join Company
          </NavLink>
          {/* create user */}
          {/* join user */}
        </div>
        <div className="flex flex-col mt-2">
        <NavLink to={`/createCompany`} type='button' className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
            Create Company
          </NavLink>
          {/* create company */}
        </div>
      </div>
    </section>
  )
}
