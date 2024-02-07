import React from 'react'
import { Room } from '../../Helper/Extraproperties';
import { ROOMS, endpoints } from '../../FirebaseHelpers/ApiInterface';
import ChangeEndpoints from '../GenericComponents/ChangeEndPoint';

export default function RoomForm() {

    const addRoom = async (state) => {
        return await endpoints.rooms.addDocument(state)
    }

    return (
        <section className='h-full bg-gray-900 py-8 px-8 text-white'>
            <ChangeEndpoints
                formName={"Room Form"}
                addButtonText={"Add new Room"}
                currentData={{}}
                querryFunction={addRoom}
                propertyList={Room}
                queryKeyValue={ROOMS}
                navigateTo="/roomView"
            />
        </section>
    )
}
