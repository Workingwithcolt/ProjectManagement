import { AuthContext } from "../../Auth";
import { MANAGER, endpoints } from "../../FirebaseHelpers/ApiInterface";
import DataView from "../GenericComponents/DataView";
import { ACCEPTED, MANAGER_LEVEL_ID, checkAdmin, checkManager } from "../../Helper/helper";
import { useContext } from "react";
import { UserContext } from "../Contexts/CurrentUserContext";
import { ManagerCard } from "./ManagerCard";

function DataReceiver({ queryData }) {
    const currentAuthContext = useContext(AuthContext);

    const queryKey = [currentAuthContext.currentUserObject.uid, MANAGER, ACCEPTED]

    var databaseQuery = undefined

    if (queryData.selectedCompany) {
        let isAdmin = checkAdmin(queryData.selectedCompany.value)
        let isManager = checkManager(queryData.selectedCompany.value)
        if (isManager) {
            databaseQuery = [[`${queryData.selectedCompany.label}`, "==", ACCEPTED], ["id", "==", queryData.currentUser.id]]
        } else if (isAdmin) {
            databaseQuery = [[`${queryData.selectedCompany.label}`, "==", ACCEPTED]]
        }
    }

    const queryFunction = async () => {
        let data = await endpoints.users.getAllDocument(databaseQuery)
        return data.filter(element => {
            if (element?.Access[queryData.selectedCompany.label].length === 1) {
                if (element.Access[queryData.selectedCompany.label][0]?.position?.position === MANAGER_LEVEL_ID) {
                    return element;
                }
            }
        })
    };

    const getValueToSearch = (current) => {
        return (
            "chetan"
        )
    }
    return (
        <section className='h-full flex flex-col bg-gray-900 text-white py-4 px-8'>
            <div className='py-4'>
                <p className=" text-4xl font-extrabold tracking-tight mt-2 mb-2 text-white">Managers</p>
            </div>
            <div className='flex-1'>
                <DataView
                    queryFunction={queryFunction}
                    queryKey={queryKey}
                    getSearchableValue={getValueToSearch}
                    Card={ManagerCard}
                />
            </div>
        </section>
    )
}

export const ManagerView = () => {
    const { currentUserAdmin } = useContext(UserContext);
    if (!(currentUserAdmin?.name === "")) {
        return (
            <DataReceiver queryData={currentUserAdmin} />
        )
    }
}