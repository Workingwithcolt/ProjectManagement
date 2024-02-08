import { useContext, useState } from "react"
import { ACCEPTED, DEVELOPER_LEVEL_ID, MANAGER_LEVEL_ID, positions } from "../../Helper/helper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MANAGER, USERS, endpoints } from "../../FirebaseHelpers/ApiInterface";
import LoadingSpinner from "../GenericComponents/LoadingSpinner";
import Button from "../GenericComponents/Button";
import { GenericSelect } from "../GenericComponents/GenericSelect";
import { UserContext } from "../Contexts/CurrentUserContext";
import { AuthContext } from "../../Auth";
import { ErrorAlert } from "../GenericComponents/ErrorAlert";

export const AcceptUser = ({ item }) => {
    const { currentUserAdmin } = useContext(UserContext);
    const currentAuthContext = useContext(AuthContext);
    const uid = currentAuthContext.currentUserObject.uid;
    const [status, setStatus] = useState("");
    const [customeError, setCustomeError] = useState("")
    const [alocateManager, setAlocateManager] = useState("");
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    var companyId = currentUserAdmin.selectedCompany.label;

    const querryFunction = async () => {
        let selectedDropdownValue = JSON.parse(status);
        item.Access[companyId].map(element => {
            let currentlevel = element;
            currentlevel.status = ACCEPTED
            currentlevel.position = {
                position: selectedDropdownValue.value,
            };
            if (selectedDropdownValue.value === DEVELOPER_LEVEL_ID) { currentlevel.position.ManagerId = JSON.parse(alocateManager).value }
        })
        item[companyId] = ACCEPTED
        await endpoints.users.updateDocument(item.id, item)
    }

    const handleRedirect = (navigateTo) => {
        navigate(navigateTo);
    };


    const handleSubmit = () => {
        if (status !== "") {
            if (JSON.parse(status).value === DEVELOPER_LEVEL_ID && alocateManager !== "") {
                setCustomeError("")
                mutate()
                return;
            } else if (JSON.parse(status).value === MANAGER_LEVEL_ID) {
                setCustomeError("")
                mutate()
                return;
            }
            setCustomeError("If You Assign role Developer Please Assign Manager!!")
            return;
        }
    }

    const { data, isLoading: loader, error: err } = useQuery([uid, MANAGER], async () => {
        const databaseQuery = [[`${currentUserAdmin.selectedCompany.label}`, "==", ACCEPTED]]
        let users = await endpoints.users.getAllDocument(databaseQuery)
        let result = []
        users.forEach(element => {
            if (element?.Access[currentUserAdmin?.selectedCompany?.label]?.length === 1) {
                if (element.Access[currentUserAdmin.selectedCompany.label][0].position.position == MANAGER_LEVEL_ID) {
                    result.push({
                        value: element.id,
                        label: element['Full Name']
                    })
                }
            }
        })
        return result;
    })

    const { isLoading, error, mutate, isSuccess } = useMutation(
        async () => await querryFunction(),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    predicate: (query) => query.queryKey.includes(USERS),
                });
            },
        }
    );

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
                    {error.message}
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
        <>
            <div className='bg-gray-900 px-2 '>
                <div className="mb-2">
                    <GenericSelect
                        id="Select_Developer"
                        currentValue={status}
                        opt={positions}
                        title="Developer"
                        handleClick={(e) => setStatus(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <GenericSelect
                        id="Select_Manager"
                        currentValue={alocateManager}
                        opt={data}
                        title="Manager"
                        handleClick={(e) => setAlocateManager(e.target.value)}
                    />
                </div>
                <Button buttonName={"Accept"} onPress={handleSubmit} type={"button"} />
                <div className="mt-2">
                    {
                        customeError && <ErrorAlert message={customeError} />
                    }
                </div>
            </div>
        </>
    )
}