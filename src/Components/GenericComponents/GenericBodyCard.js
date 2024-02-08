import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { AuthContext } from '../../Auth';
import { useQuery } from '@tanstack/react-query';
import { endpoints } from '../../FirebaseHelpers/ApiInterface';
import { UserContext } from '../Contexts/CurrentUserContext';
import { CURRENTUSER } from '../User/UserConstants';
import { GenericSelect } from './GenericSelect';
import { ErrorAlert } from './ErrorAlert';

const ExtractObjectToArray = (Object) => {
    let returnValue = [];
    for (const label in Object) {
        if (Object.hasOwnProperty(label)) {
            returnValue.push({ label, value: Object[label] });
        }
    }
    return returnValue
}

const CurrentUser = ({ company, SelectCompany, currentAuthContext }) => {
    const { setCurrentUserAdmin, currentUserAdmin } = useContext(UserContext)
    let uid = currentAuthContext?.currentUserObject?.uid;

    var { data } = useQuery(
        [uid, CURRENTUSER],
        async () => await endpoints.users.getDocument(uid));

    const handleClick = (e) => {
        SelectCompany(JSON.parse(e.target.value))
        setCurrentUserAdmin({
            currentUser: data,
            selectedCompany: JSON.parse(e.target.value)
        })
    }

    // useEffect(() => {

    // }, [currentUserAdmin, data, setCurrentUserAdmin])


    if (currentUserAdmin && data && Object.keys(data).length > 0) {

        let option = ExtractObjectToArray(data?.Access);

        return (
            <div className='bg-gray-900 px-2'>
                <GenericSelect
                    id="Select_Company"
                    currentValue={company}
                    opt={option}
                    title="company"
                    handleClick={handleClick}
                />
            </div>
        );
    }
    return (
        <div className='bg-gray-900 px-2'>
            <ErrorAlert
                message={" Please Join or Select Company"}
            />
        </div>

    )
}
export default function GenericBodyCard({ children }) {
    const [company, SelectCompany] = useState(undefined)
    const currentAuthContext = useContext(AuthContext)

    return (
        <div className='flex flex-col h-screen'>
            <Header />
            {currentAuthContext?.currentUserObject?.uid && <CurrentUser company={company} SelectCompany={SelectCompany} currentAuthContext={currentAuthContext} />}
            <main className='flex-1'>
                {children}
            </main>
            <Footer />
        </div>
    )
}
