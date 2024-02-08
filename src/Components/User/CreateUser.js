import { useContext } from "react"
import { USERS, endpoints } from "../../FirebaseHelpers/ApiInterface"
import { userForm } from "../../Helper/Extraproperties"
import ChangeEndpoints from "../GenericComponents/ChangeEndPoint"
import { AuthContext } from "../../Auth"

export const CreateUser = () => {
    const currentAuthContext = useContext(AuthContext);
    const uid = currentAuthContext.currentUserObject.uid;
    const addUser = async (state) => {
        state.id = uid;
        return await endpoints.users.addDocument(state, uid);
    }

    return (
        <section className='h-full bg-gray-900 py-8 px-8 text-white'>
            <ChangeEndpoints
                formName={"Create Form"}
                addButtonText={"Create User"}
                currentData={{}}
                querryFunction={addUser}
                propertyList={userForm}
                queryKeyValue={USERS}
                navigateTo="/"
            />
        </section>
    )
}
