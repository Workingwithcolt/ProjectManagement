import React, { useState } from 'react'
import { ROOMS, endpoints } from '../../FirebaseHelpers/ApiInterface'
import CardRow from '../GenericComponents/CardRow'
import EditDeleteControls from '../GenericComponents/EditDeleteControls'
import { Room } from '../../Helper/Extraproperties'
import { getCapacity } from '../../Helper/helper'

const RoomDetailCardContent = ({ item, setSelectedItem }) => {
    return (
        <>
            <>
                <ul>
                    <CardRow
                        name={"Room Name :"}
                        value={item.RoomName}
                    />
                    <CardRow
                        name={"Capacity:"}
                        value={getCapacity(item)}
                    />
                </ul>
            </>
        </>)
}

function RoomDetailsCard({ item, setSelectedItem }) {
    const [change, setChange] = useState(undefined)

    const DeleteRoom = async () => {
        return await endpoints.rooms.deleteDocument(item.id);
    }

    const UpdateRoom = async (state) => {
        return await endpoints.rooms.updateDocument(change.id, state)
    }

    return (
        <EditDeleteControls
            item={item}
            cardData={
                <RoomDetailCardContent
                    item={item}
                    setSelectedItem={setSelectedItem}
                    key={ROOMS}
                />
            }
            deleteItem={DeleteRoom}
            updateItem={UpdateRoom}
            querykey={ROOMS}
            key={ROOMS}
            formName={"Update room"}
            propertyList={Room}
            editNavigateto={"/roomView"}
            deleteNavigateTo={"/"}
            setChange={setChange}
            change={change}
            setSelectedItem={setSelectedItem}
        />
    )
}

export default RoomDetailsCard