import { useContext } from "react";
import { UserContext } from "../Contexts/CurrentUserContext";
import CardRow from "../GenericComponents/CardRow";
import Button from "../GenericComponents/Button";
import { NavLink } from "react-router-dom";

export const UserCard = ({ item }) => {
    const { currentUserAdmin } = useContext(UserContext)
    var companyId = currentUserAdmin.selectedCompany.label;
    console.log(item);
    return (
        <><div className="block w-full p-6 bg-gray-700 border border-gray-200 rounded-lg shadow">
            <h1 className="mb-2 text-md font-bold tracking-tight text-white">
                {item['Full Name']}
            </h1>
            <ul>
                <CardRow
                    name={"Email :"}
                    value={item.Email}
                />
                <CardRow
                    name={"status"}
                    value={item[companyId]}
                />
                <div className="flex flex- gap-2">
                    <NavLink to={`/TaskForm/${item.id}`} type='button' className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
                        Add New Task
                    </NavLink>
                    <NavLink to={`/ShowTask/${item.id}`} type='button' className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
                        Show Task
                    </NavLink>
                </div>
            </ul>
        </div></>
    )
}