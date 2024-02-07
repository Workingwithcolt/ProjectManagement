import { useContext } from "react";
import { UserContext } from "../Contexts/CurrentUserContext";
import CardRow from "../GenericComponents/CardRow";
import Button from "../GenericComponents/Button";

export const ManagerCard = ({ item }) => {
    const { currentUserAdmin } = useContext(UserContext)
    var companyId = currentUserAdmin.selectedCompany.label;
    return (<>  <div className="block w-full p-6 bg-gray-700 border border-gray-200 rounded-lg shadow">
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
            <Button
                buttonName={"Assign Project"}
                type={"button"}
                onPress={() => console.log("it is ok")}
            />
        </ul>
    </div></>)
}