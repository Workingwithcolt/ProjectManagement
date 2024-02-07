import React from 'react'
import CardRow from '../GenericComponents/CardRow'
import { getCapacity } from '../../Helper/helper'

function CarDisplayCard({ item }) {

    return (
        <div className="block max-w-sm p-6 bg-gray-700 border border-gray-200 rounded-lg shadow">
            <h5 className="mb-2 text-md font-bold tracking-tight text-white">
                {item.carName}
            </h5>
            <ul>
                <CardRow
                    name={"Car Name:"}
                    value={item.carName}
                />
                <CardRow
                    name={"Car Number:"}
                    value={item.carNumber}
                />
                <CardRow
                    name={"Capacity:"}
                    value={getCapacity(item)}
                />
            </ul>
        </div>
    )
}

export default CarDisplayCard