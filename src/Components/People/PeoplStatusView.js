import React, { useContext } from 'react'
import DataView from '../GenericComponents/DataView'
import { PEOPLE, endpoints } from '../../FirebaseHelpers/ApiInterface';
import { AuthContext } from '../../Auth';
import { NavLink } from 'react-router-dom';
import PeopleDisplayCard from '../GenericComponents/PeopleDisplayCard';
import PeopleStatusViewCard from './PeopleStatusViewCard';
import { UserContext } from '../Contexts/CurrentUserContext';

function PeoplStatusView() {
const {currentUserAdmin} = useContext(UserContext);
  const currentAuthContext = useContext(AuthContext);

  const queryKey = [currentAuthContext.currentUserObject.uid, PEOPLE]

  const queryFunction = async () => {
    return await endpoints.people.getAllDocument()
  };

  const getValueToSearch = (current) => {
    return (
      current.peopleName + " " +
      current.peopletag + " " +
      current.RoomName + " " +
      current.carNumber
    )
  }

  return (
    <section className='h-full flex flex-col bg-gray-900 text-white py-4 px-8'>
      <div className='py-4'>
        <p className=" text-4xl font-extrabold tracking-tight mt-2 mb-2 text-white">People</p>
      </div>
      <div className='flex-1'>
        <DataView
          queryFunction={queryFunction}
          queryKey={queryKey}
          getSearchableValue={getValueToSearch}
          Card={PeopleDisplayCard}
          DetailedElement={PeopleStatusViewCard}
          newDataButton={
            <NavLink to={'/peopleForm'} type='button' className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
              Add New
            </NavLink>
          }
        />
      </div>
    </section>
  )
}
export default PeoplStatusView;