import React, { useState } from 'react'
import CardRow from '../GenericComponents/CardRow'
import { PEOPLE, endpoints } from '../../FirebaseHelpers/ApiInterface';
import { PeopleProps } from '../../Helper/Extraproperties';
import EditDeleteControls from '../GenericComponents/EditDeleteControls';

export default function PeopleStatusViewCard({ item, setSelectedItem }) {
    const [change, setChange] = useState(undefined)

    const DeletePeople = async () => {
        return await endpoints.people.deleteDocument(item.id);
    }

    const UpdatePeople = async (state) => {
        return await endpoints.people.updateDocument(change.id, state)
    }

    return (
        <EditDeleteControls
            item={item}
            cardData={
                <>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{item.peopleName}</h5>
                    <ul>
                        <CardRow
                            name={"Travel Through"}
                            value={item.carNumber}
                        />
                        <CardRow
                            name={"Room"}
                            value={item.RoomName}
                        />
                    </ul>
                </>
            }
            isUpdateForm={true}
            deleteItem={DeletePeople}
            updateItem={UpdatePeople}
            querykey={PEOPLE}
            key={PEOPLE}
            formName={"Update people"}
            propertyList={PeopleProps}
            editNavigateto={"/"}
            deleteNavigateTo={"/"}
            setChange={setChange}
            setSelectedItem={setSelectedItem}
            change={change}
        />
    )
}
