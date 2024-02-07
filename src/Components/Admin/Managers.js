import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Auth";
import { MANAGER, endpoints } from "../../FirebaseHelpers/ApiInterface";
import DataView from "../GenericComponents/DataView";
import { ACCEPTED, ADMIN_USER_LEVEL_ID, MANAGER_LEVEL_ID } from "../../Helper/helper";
import { useContext } from "react";
import { UserContext } from "../Contexts/CurrentUserContext";
import { ManagerCard } from "./ManagerCard";

function DataReceiver({ queryData }) {
    const currentAuthContext = useContext(AuthContext);

    const queryKey = [currentAuthContext.currentUserObject.uid,MANAGER, ACCEPTED]
    
    var databaseQuery = undefined

    if(queryData.selectedCompany){
        let addEffectAccess = queryData.selectedCompany.value.some(item=>item.levelID === ADMIN_USER_LEVEL_ID);
        if(addEffectAccess){
            databaseQuery = [`${queryData.selectedCompany.label}`, "==", ACCEPTED]
        }
    }

    // if (!queryData?.name == "") {
    //   console.log(checkAdmin(queryData.selectedCompany))
    // }
    const queryFunction = async () => {
       let data =  await endpoints.users.getAllDocument(databaseQuery)
       return data.filter(element=>{
        if(element?.Access[queryData.selectedCompany.label].length === 1){
            if(element.Access[queryData.selectedCompany.label][0]?.position?.position === MANAGER_LEVEL_ID){
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
                <p className=" text-4xl font-extrabold tracking-tight mt-2 mb-2 text-white">People</p>
            </div>
            <div className='flex-1'>
                <DataView
                    queryFunction={queryFunction}
                    queryKey={queryKey}
                    getSearchableValue={getValueToSearch}
                    Card={ManagerCard}
                    // DetailedElement={AcceptUser}
                />
            </div>
        </section>
    )
}

export const ManagerView = () => {
    const { currentUserAdmin } = useContext(UserContext);
    if (!(currentUserAdmin?.name == "")) {
        return (
            <DataReceiver queryData={currentUserAdmin} />
        )
    }
}