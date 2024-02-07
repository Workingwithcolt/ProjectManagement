import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../Auth';
import { endpoints } from '../../FirebaseHelpers/ApiInterface';
import { UserContext } from '../Contexts/CurrentUserContext';
import { useQuery } from '@tanstack/react-query';
import { CURRENTUSER } from '../User/UserConstants';

export function Home() {
  const currentAuthContext = useContext(AuthContext)
  return (
    <section className="bg-gray-900 h-full flex justify-center items-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-white">Event Manager</h1>
        <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-gray-400">Effortlessly organize and coordinate events with the intuitive Event Manager App.</p>
        {/* {currentAuthContext?.currentUserObject?.uid && <CurrentUser currentAuthContext={currentAuthContext} />} */}
      </div>
    </section>
  )
}
