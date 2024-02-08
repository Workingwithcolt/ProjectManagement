import React, { useContext } from 'react'
import DataView from '../GenericComponents/DataView'
import { endpoints } from '../../FirebaseHelpers/ApiInterface';
import { AuthContext } from '../../Auth';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../Contexts/CurrentUserContext';
import { PENDING, checkAdmin } from '../../Helper/helper';
import RequestedCard from './RequestedCard';
import { AcceptUser } from './AcceptUser';


function DataReceiver({ queryData }) {
  const currentAuthContext = useContext(AuthContext);
  const queryKey = [currentAuthContext.currentUserObject.uid, PENDING]
  var databaseQuery = undefined
  const queryFunction = async () => {
    let isAdmin = checkAdmin(queryData.selectedCompany.value)
    if (isAdmin) {
      databaseQuery =[ [`${queryData.selectedCompany.label}`, "==", PENDING]]
    }
    return await endpoints.users.getAllDocument(databaseQuery)
  };

  const getValueToSearch = (current) => {
    return (
      "chetan"
    )
  }
  return (
    <section className='h-full flex flex-col bg-gray-900 text-white py-4 px-8'>
      <div className='py-4'>
        <p className=" text-4xl font-extrabold tracking-tight mt-2 mb-2 text-white">Requested Users</p>
      </div>
      <div className='flex-1'>
        <DataView
          queryFunction={queryFunction}
          queryKey={queryKey}
          getSearchableValue={getValueToSearch}
          Card={RequestedCard}
          DetailedElement={AcceptUser}
        />
      </div>
    </section>
  )
}

function RequestedUsers() {
  const { currentUserAdmin } = useContext(UserContext);
  if (!(currentUserAdmin?.name == "")) {
    return (
      <DataReceiver queryData={currentUserAdmin} />
    )
  }
}
export default RequestedUsers;