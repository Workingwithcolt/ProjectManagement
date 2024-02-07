import React, { useContext } from 'react'
import DataView from '../GenericComponents/DataView'
import { ROOMS, endpoints } from '../../FirebaseHelpers/ApiInterface'
import { AuthContext } from '../../Auth';
import RoomDetailsCard from './RoomDetailsCard';
import { NavLink } from 'react-router-dom';
import RoomDisplayCard from './RoomDisplayCard';

function RoomStatusView() {
  const currentAuthContext = useContext(AuthContext);

  const queryFunction = async () => {
    const data = await endpoints.rooms.getAllDocument();
    return data;
  }

  const queryKey =
    [
      currentAuthContext.currentUserObject.uid,
      ROOMS
    ];

  const getValueToSearch = (current) => {
    return (
      current.RoomName
    )
  }

  return (
    <section className='h-full flex flex-col bg-gray-900 text-white py-4 px-8'>
      <div className='py-4'>
        <p className=" text-4xl font-extrabold tracking-tight mt-2 mb-2 text-white">Rooms</p>
      </div>
      <div className='flex-1'>
        <DataView
          queryFunction={queryFunction}
          queryKey={queryKey}
          getSearchableValue={getValueToSearch}
          Card={RoomDisplayCard}
          DetailedElement={RoomDetailsCard}
          newDataButton={
            <NavLink to={'/roomForm'} type='button' className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
              Add New
            </NavLink>
          }
        />
      </div>

    </section>
  )
}

export default RoomStatusView