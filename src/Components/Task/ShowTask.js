import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Auth";
import { UserContext } from "../Contexts/CurrentUserContext";
import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../../FirebaseHelpers/ApiInterface";
import { TaskCard } from "./TaskCard";
import DataView from "../GenericComponents/DataView";

export const ShowTask = () => {
    let { id } = useParams();
    const currentAuthContext = useContext(AuthContext)
    const { currentUserAdmin } = useContext(UserContext);
    var databaseQuery = ["UserId", "==", id]

    const queryKey = [currentAuthContext.currentUserObject.uid, id, "Tasks"];
    
    const queryFunction = async () => {
        return  await endpoints.Task.getAllDocument(databaseQuery);

    };

    const getValueToSearch = (current) => {
        return (
            "chetan"
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
                    Card={TaskCard}
                    // DetailedElement={ProjectDetail}
                />
            </div>
        </section>
    )
}