import { useContext } from "react";
import { AuthContext } from "../../Auth";
import { PROJECTS, endpoints } from "../../FirebaseHelpers/ApiInterface";
import { ProjectCard } from "./ProjectCard";
import { UserContext } from "../Contexts/CurrentUserContext";
import { NavLink } from "react-router-dom";
import { ADMIN_USER_LEVEL_ID } from "../../Helper/helper";
import DataView from "../GenericComponents/DataView";
import { ProjectDetail } from "./ProjectDetail";

function DataReceiver({ queryData }) {
    const currentAuthContext = useContext(AuthContext);

    const queryKey = [currentAuthContext.currentUserObject.uid, PROJECTS]

    var databaseQuery = undefined

    if (queryData.selectedCompany) {
        let addEffectAccess = queryData.selectedCompany.value.some(item => item.levelID === ADMIN_USER_LEVEL_ID);
        if (addEffectAccess) {
            databaseQuery = [["companyID", "==", queryData.selectedCompany.label]]
        }
    }


    const queryFunction = async () => {
        return await endpoints.Project.getAllDocument(databaseQuery)

    };

    const getValueToSearch = (current) => {
      
        return (
            current.project
        )
    }
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
                    Card={ProjectCard}
                    DetailedElement={ProjectDetail}
                    newDataButton={
                        <NavLink to={'/ProjectForm'} type='button' className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
                            Add New Project
                        </NavLink>
                    }
                />
            </div>
        </section>
    )
}

export const ProjectView = () => {
    const { currentUserAdmin } = useContext(UserContext);
    if (!(currentUserAdmin?.name == "")) {
        return (
            <DataReceiver queryData={currentUserAdmin} />
        )
    }
}