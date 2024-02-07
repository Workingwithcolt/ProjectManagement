import React from 'react'
import CardRow from '../GenericComponents/CardRow'
import { getCapacity } from '../../Helper/helper'

function RoomDisplayCard({ item }) {

  return (
    <div className="block w-full p-6 bg-gray-700 border border-gray-200 rounded-lg shadow">
      <h1 className="mb-2 text-md font-bold tracking-tight text-white">
        {item.RoomName}
      </h1>
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
    </div>
  )
}

export default RoomDisplayCard