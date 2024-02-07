import { useContext } from "react";
import { AuthContext } from "../../Auth";
import { USERS, endpoints } from "../../FirebaseHelpers/ApiInterface"
import { JoinForm } from "../../Helper/Extraproperties";
import { ACCEPTED, PENDING, USER_USER_LEVEL_ID, USER_USER_LEVEL_NAME, deepCopyObject, returnCurrentCompany } from "../../Helper/helper";
import ChangeEndpoints from "../GenericComponents/ChangeEndPoint";
import { useQuery } from "@tanstack/react-query";
import { CURRENTUSER } from "./UserConstants";
import { UserContext } from "../Contexts/CurrentUserContext";

export const Userjoin = () => {
    const currentAuthContext = useContext(AuthContext);
    const { currentUserAdmin } = useContext(UserContext);
    let uid = currentAuthContext.currentUserObject.uid;

    var { data } = useQuery([uid, CURRENTUSER],
        async () => await endpoints.users.getDocument(uid));

    const joinUser = async (state) => {

        state.Access = {}

        let CompanyInfo = await returnCurrentCompany(endpoints, state.UniqueId);
        console.log(CompanyInfo);

        if (Object.keys(CompanyInfo).length == 0) return Promise.reject("Company Does not Exist")

        if (Object.keys(data).length == 0) return Promise.reject("First Create User")

        if (data?.Access && data?.Access[state.UniqueId]) {
            const isUserLevelIdPresent = data.Access[state.UniqueId]?.some(item => item.userLevelId === USER_USER_LEVEL_ID);
            if (isUserLevelIdPresent) {
                return Promise.reject("User is Already Join")
            }
        }
        if (data?.Access) {
            state.Access = deepCopyObject(data.Access);
        }
        state.Access[state.UniqueId] = [{
            level: USER_USER_LEVEL_NAME,
            levelID: USER_USER_LEVEL_ID,
            status: PENDING
        }]
        
        state[state.UniqueId] = PENDING
        delete state.UniqueId
        return await endpoints.users.updateDocument(uid, state);

    }

    return (
        <section className='h-full bg-gray-900 py-8 px-8 text-white'>
            <ChangeEndpoints
                formName={"New User Form"}
                addButtonText={"Add new User"}
                currentData={{}}
                querryFunction={joinUser}
                propertyList={JoinForm}
                queryKeyValue={USERS}
                navigateTo="/roomView"
            />
        </section>
    )
}
