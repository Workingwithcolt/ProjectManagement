import React, { useContext } from 'react'
import DataView from '../GenericComponents/DataView'
import { endpoints } from '../../FirebaseHelpers/ApiInterface';
import { AuthContext } from '../../Auth';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../Contexts/CurrentUserContext';
import { ACCEPTED, PENDING, checkAdmin, checkManager } from '../../Helper/helper';
import { UserCard } from './UserCard';


function DataReceiver({ queryData }) {
    const currentAuthContext = useContext(AuthContext);
    let uid = currentAuthContext.currentUserObject.uid
    const queryKey = [currentAuthContext.currentUserObject.uid, ACCEPTED]
    var databaseQuery = undefined

    // if (!queryData?.name == "") {
    //   console.log(checkAdmin(queryData.selectedCompany))
    // }
    const queryFunction = async () => {
        let isAdmin = checkAdmin(queryData.selectedCompany.value)
        let isManager = checkManager(queryData.selectedCompany.value)
        console.log(isManager);
        if (isAdmin) {
            databaseQuery = [`${queryData.selectedCompany.label}`, "==", ACCEPTED]
        } else if (isManager) {
            databaseQuery = [`${queryData.selectedCompany.label}`, "==", ACCEPTED]
        }
        let data = await endpoints.users.getAllDocument(databaseQuery)
        let result = []
        if (data.length > 0) {
            data.forEach(element => {
                if (element?.Access[queryData.selectedCompany.label][0]?.position?.ManagerId === uid) {
                    result.push(element)
                }
            })
        }
        return result;
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
                    Card={UserCard}
                />
            </div>
        </section>
    )
}

function UserView() {
    const { currentUserAdmin } = useContext(UserContext);
    if (!(currentUserAdmin?.name == "")) {
        return (
            <DataReceiver queryData={currentUserAdmin} />
        )
    }
}
export default UserView;