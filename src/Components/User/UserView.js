import React, { useContext } from 'react'
import DataView from '../GenericComponents/DataView'
import { USERS, endpoints } from '../../FirebaseHelpers/ApiInterface';
import { AuthContext } from '../../Auth';
import { UserContext } from '../Contexts/CurrentUserContext';
import { ACCEPTED, checkAdmin, checkManager } from '../../Helper/helper';
import { UserCard } from './UserCard';


function DataReceiver({ queryData }) {
    const currentAuthContext = useContext(AuthContext);
    let uid = currentAuthContext.currentUserObject.uid
    const queryKey = [currentAuthContext.currentUserObject.uid, USERS, ACCEPTED]
    var databaseQuery = undefined

    const queryFunction = async () => {
        let isAdmin = checkAdmin(queryData.selectedCompany.value)
        let isManager = checkManager(queryData.selectedCompany.value)
      
        if (isAdmin) {
            databaseQuery = [[`${queryData.selectedCompany.label}`, "==", ACCEPTED]]
        } else if (isManager) {
            databaseQuery = [[`${queryData.selectedCompany.label}`, "==", ACCEPTED]]
        } else {
            databaseQuery = [[`${queryData.selectedCompany.label}`, "==", ACCEPTED], ["id", "==", queryData.currentUser.id]]
        }
      
        let data = await endpoints.users.getAllDocument(databaseQuery)
        let result = []
        if (data.length > 0) {
            data.forEach(element => {
                if (isManager && element?.Access[queryData.selectedCompany.label][0]?.position?.ManagerId === uid || element.id == uid) {
                    result.push(element)
                } else if (isAdmin) {
                    result.push(element)
                } else if (element.id == uid) {
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
                <p className=" text-4xl font-extrabold tracking-tight mt-2 mb-2 text-white">Users</p>
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