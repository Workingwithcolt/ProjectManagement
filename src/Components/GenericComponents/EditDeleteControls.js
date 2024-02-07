import React from 'react'
import DeleteItem from './DeleteItem'
import ChangeEndpoints from './ChangeEndPoint'
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";

export default function EditDeleteControls({
    setSelectedItem,
    querykey,
    deleteItem,
    updateItem,
    cardData,
    formName,
    propertyList,
    editNavigateto,
    deleteNavigateTo,
    setChange,
    change,
    item
}) {

    if (change) {
        return (
            <ChangeEndpoints
                isUpdateForm={true}
                formName={formName}
                addButtonText={"Update"}
                currentData={change}
                querryFunction={updateItem}
                propertyList={propertyList}
                queryKeyValue={querykey}
                navigateTo={editNavigateto}
                setSelectedItem={setSelectedItem}
            />
        )
    }
    return (
        <div className="w-full p-6 border border-gray-200 rounded-lg shadow bg-gray-700">
            {
                cardData
            }
            <div className="p-2 flex gap-2 justify-end mt-4">
                <button onClick={() => setSelectedItem(undefined)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    <IoArrowBackOutline />
                </button>
                <div className="flex gap-2">
                    <button onClick={() => setChange(item)} type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        <MdOutlineModeEdit />
                    </button>
                    <DeleteItem
                        querryFunction={deleteItem}
                        queryKeyValue={querykey}
                        navigateTo={deleteNavigateTo}
                        setSelectedItem={setSelectedItem}
                    />
                </div>
            </div>

        </div>
    )
}
