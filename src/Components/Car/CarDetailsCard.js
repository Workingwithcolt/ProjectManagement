import React, { useState } from 'react'
import CardRow from '../GenericComponents/CardRow'
import EditDeleteControls from '../GenericComponents/EditDeleteControls'
import { CARS, endpoints } from '../../FirebaseHelpers/ApiInterface'
import { CarProps } from '../../Helper/Extraproperties'

const CarDetailCardContent = ({ item, setSelectedItem }) => {
  return (
    <>
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
        value={item.capacity}
      />
    </>
  )
}

function CarDetailsCard({ item, setSelectedItem }) {
  const [change, setChange] = useState(undefined)

  const DeleteCar = async () => {
    return await endpoints.cars.deleteDocument(item.id);
  }

  const UpdateCar = async (state) => {
    return await endpoints.cars.updateDocument(change.id, state)
  }

  return (
    <EditDeleteControls
      cardData={
        <CarDetailCardContent
          item={item}
          setSelectedItem={setSelectedItem}
        />
      }
      item={item}
      deleteItem={DeleteCar}
      updateItem={UpdateCar}
      querykey={CARS}
      key={CARS}
      formName={"Update car"}
      propertyList={CarProps}
      editNavigateto={"/"}
      deleteNavigateTo={"/"}
      setChange={setChange}
      change={change}
      setSelectedItem={setSelectedItem}
    />

  )
}

export default CarDetailsCard