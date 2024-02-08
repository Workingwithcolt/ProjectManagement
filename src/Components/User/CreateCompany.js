import { useContext } from "react"
import { USERS, endpoints } from "../../FirebaseHelpers/ApiInterface"
import { createCompany } from "../../Helper/Extraproperties"
import { ACCEPTED, ADMIN_USER_LEVEL_ID, ADMIN_USER_LEVEL_NAME, USER_USER_LEVEL_ID, USER_USER_LEVEL_NAME, returnCurrentCompany } from "../../Helper/helper"
import ChangeEndpoints from "../GenericComponents/ChangeEndPoint"
import { AuthContext } from "../../Auth"

export const CreateCompany = () => {
    const currentAuthContext = useContext(AuthContext);
    const uid = currentAuthContext.currentUserObject.uid
    const addUser = async (state) => {
        state.Access = {
            [state.UniqueId]: [{
                level: ADMIN_USER_LEVEL_NAME,
                levelID: ADMIN_USER_LEVEL_ID,
                status: ACCEPTED
            },
            {
                level: USER_USER_LEVEL_NAME,
                levelID: USER_USER_LEVEL_ID,
                status: ACCEPTED
            }
            ]
        }
        state[state.UniqueId] = ACCEPTED
        state.id = uid;
        let CompanyInfo = undefined;
        try {
            CompanyInfo = returnCurrentCompany(endpoints, uid);
            if (Object.keys(CompanyInfo).length !== 0) {
                return Promise.reject("The Company is already Exist !!")
            }
        } catch (e) {

        }
        await endpoints.Company.addDocument(state, state.UniqueId);
        return await endpoints.users.addDocument(state, uid);
    }

    return (
        <section className='h-full bg-gray-900 py-8 px-8 text-white'>
            <ChangeEndpoints
                formName={"Join Form"}
                addButtonText={"Join User"}
                currentData={{}}
                querryFunction={addUser}
                propertyList={createCompany}
                queryKeyValue={USERS}
                navigateTo="/"
            />
        </section>
    )
}
