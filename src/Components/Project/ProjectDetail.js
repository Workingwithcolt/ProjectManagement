import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MANAGER, PROJECTS, USERS, endpoints } from "../../FirebaseHelpers/ApiInterface"
import { ACCEPTED, MANAGER_LEVEL_ID, deepCopyObject } from "../../Helper/helper";
import LoadingSpinner from "../GenericComponents/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../Contexts/CurrentUserContext";
import { AuthContext } from "../../Auth";
import { GenericSelect } from "../GenericComponents/GenericSelect";
import Button from "../GenericComponents/Button";

export const ProjectDetail = ({ item }) => {
    console.log(item);
    const { currentUserAdmin } = useContext(UserContext);
    const currentAuthContext = useContext(AuthContext);
    const uid = currentAuthContext.currentUserObject.uid;
    const [alocateManager, setAlocateManager] = useState("");
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleRedirect = (navigateTo) => {
        navigate(navigateTo);
    };

    const queryFunction = async () => {
        let parsedValue = JSON.parse(alocateManager).value;
        if (!parsedValue.Access[currentUserAdmin.selectedCompany.label][0]?.Project ||
            !parsedValue.Access[currentUserAdmin.selectedCompany.label][0]?.Project[item.id]) {

            let obj = parsedValue.Access[currentUserAdmin.selectedCompany.label][0]?.Project
                ? parsedValue.Access[currentUserAdmin.selectedCompany.label][0]?.Project : {};
            obj[item.id] = MANAGER_LEVEL_ID
            parsedValue.Access[currentUserAdmin.selectedCompany.label][0].Project = obj;
            item.AssignedManager = parsedValue.id;
            await endpoints.Project.updateDocument(item.id, item)
            await endpoints.users.updateDocument(parsedValue.id, parsedValue)
            return;
        }
        return Promise.reject("Project is Already Assign !!")
    }


    const { data, isLoading: loader, error: err } = useQuery([uid, MANAGER], async () => {
        const databaseQuery = [[`${currentUserAdmin.selectedCompany.label}`, "==", ACCEPTED]]
        let users = await endpoints.users.getAllDocument(databaseQuery)
        let result = []
        users.forEach(element => {
            if (element?.Access[currentUserAdmin?.selectedCompany?.label]?.length === 1) {
                if (element.Access[currentUserAdmin.selectedCompany.label][0].position.position == MANAGER_LEVEL_ID) {
                    result.push({
                        value: element,
                        label: element['Full Name']
                    })
                }
            }
        })
        return result;
    })
    const { isLoading, error, mutate, isSuccess } = useMutation(
        async () => await queryFunction(),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    predicate: (query) => query.queryKey.includes([PROJECTS, MANAGER, USERS]),
                });
            },
        }
    );

    const handleSubmit = () => {
        if (alocateManager != "") {
            mutate()
        }
    }

    if (isLoading || loader) {
        return (
            <div className="flex w-full h-full justify-center items-center">
                <LoadingSpinner />
            </div>
        )
    }

    if ((error || err) && (error !== "" || err !== "")) {
        return (
            <div className="flex flex-col p-2">
                <div className="p-4 mb-4 text-sm text-white text-center rounded-lg bg-gray-700" role="alert">
                    {error.message || err || error}
                </div>
                <button onClick={() => handleRedirect("/home")}>
                    ok
                </button>
            </div>

        );
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col p-2">
                <div className="p-4 mb-4 text-sm text-white text-center rounded-lg bg-gray-700" role="alert">
                    Updated Succcessfully !!
                </div>
                <button onClick={() => handleRedirect("/home")}>
                    ok
                </button>
            </div>
        )
    }
    return (
        <section className='h-full flex flex-col bg-gray-900 text-white py-4 px-8'>
            <div className='flex-1'>
                Detail:{
                    item.projectDetail
                }
                <div className="mb-2">
                    <GenericSelect
                        id="Select_Manager"
                        currentValue={alocateManager}
                        opt={data}
                        title="Assign Manager"
                        handleClick={(e) => setAlocateManager(e.target.value)}
                    />
                </div>
                <Button buttonName={"Accept"} onPress={handleSubmit} type={"button"} />
            </div>
        </section>
    )
}