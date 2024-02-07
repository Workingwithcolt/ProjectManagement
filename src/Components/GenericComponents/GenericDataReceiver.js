import { NavLink } from "react-router-dom";
import DataView from "./DataView";

export function GenericDataReceiver({  queryKey, queryFunction, getValueToSearch, Card, DetailedElement, formpath, formButtonName }) {
    return (
        <section className='h-full flex flex-col bg-gray-900 text-white py-4 px-8'>
            <div className='py-4'>
                <p className=" text-4xl font-extrabold tracking-tight mt-2 mb-2 text-white">Project</p>
            </div>
            <div className='flex-1'>
                <DataView
                    queryFunction={queryFunction}
                    queryKey={queryKey}
                    getSearchableValue={getValueToSearch}
                    Card={Card}
                    DetailedElement={DetailedElement}
                    newDataButton={
                        formButtonName ?
                            <NavLink to={formpath} type='button' className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
                                {formButtonName}
                            </NavLink>
                            :<></>
                    }
                />
            </div>
        </section>
    )
}