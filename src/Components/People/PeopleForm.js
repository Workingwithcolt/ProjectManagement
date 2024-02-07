import React from 'react'
import ChangeEndpoints from '../GenericComponents/ChangeEndPoint'
import { PeopleProps } from '../../Helper/Extraproperties'
import { PEOPLE, endpoints } from '../../FirebaseHelpers/ApiInterface'

function PeopleForm() {
    const addPeople = async (state) => {
        return await endpoints.people.addDocument(state)
    }
    return (
        <section className='h-full bg-gray-900 py-8 px-8 text-white'>
            <ChangeEndpoints
                formName={"People Form"}
                addButtonText={"Add new People"}
                currentData={{}}
                querryFunction={addPeople}
                propertyList={PeopleProps}
                queryKeyValue={PEOPLE}
                navigateTo="/peopleView"
            />
        </section>
    )
}

export default PeopleForm