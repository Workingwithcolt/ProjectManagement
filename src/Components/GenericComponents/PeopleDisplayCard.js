import React from 'react'
import CardRow from './CardRow'

function PeopleDisplayCard({ item }) {
    return (
        <div className="block max-w-sm p-6 bg-gray-700 border border-gray-200 rounded-lg shadow">
            <h5 className="mb-2 text-md font-bold tracking-tight text-white truncate">
                {item.peopleName}
            </h5>
            <ul>
                <CardRow
                    name={"Group"}
                    value={item.peopletag}
                />
                <CardRow
                    name={"Travel Through"}
                    value={item.carNumber}
                />
                <CardRow
                    name={"Room"}
                    value={item.RoomName}
                />
            </ul>
        </div>
    )
}

export default PeopleDisplayCard