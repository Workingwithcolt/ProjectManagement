import React from 'react'
import { CarProps } from '../../Helper/Extraproperties'
import ChangeEndpoints from '../GenericComponents/ChangeEndPoint'
import { CARS, endpoints } from '../../FirebaseHelpers/ApiInterface'

function CarForm() {
    const addCar = async (state) => {
         return await endpoints.cars.addDocument(state)
    }
    return (
        <section className='h-full bg-gray-900 py-8 px-8 text-white'>
            <ChangeEndpoints
                formName={"Car Form"}
                addButtonText={"Add new Car"}
                currentData={{}}
                querryFunction={addCar}
                propertyList={CarProps}
                queryKeyValue={CARS}
                navigateTo="/carView"
            />
        </section>
    )
}

export default CarForm