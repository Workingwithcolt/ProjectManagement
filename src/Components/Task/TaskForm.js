import React, { useContext } from 'react'
import { Projects, Room, Task } from '../../Helper/Extraproperties';
import { PROJECTS, TASK, endpoints } from '../../FirebaseHelpers/ApiInterface';
import ChangeEndpoints from '../GenericComponents/ChangeEndPoint';
import { PENDING, checkAdmin, checkManager } from '../../Helper/helper';
import { UserContext } from '../Contexts/CurrentUserContext';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Auth';

export default function TaskForm() {
    let { id } = useParams();
    const currentAuthContext = useContext(AuthContext)
    const { currentUserAdmin } = useContext(UserContext);
    const addProject = async (state) => {
        let isManager = checkManager(currentUserAdmin.selectedCompany.value);
        if (!isManager) {
            return Promise.reject("Only Admin or manager Can Create Task !!")
        }
        state.UserId = id;
        state.ManagerId = currentAuthContext.currentUserObject.uid;
        state.status = PENDING
        return await endpoints.Task.addDocument(state)
    }

    return (
        <section className='h-full bg-gray-900 py-8 px-8 text-white'>
            <ChangeEndpoints
                formName={"Task Form"}
                addButtonText={"Add new Task"}
                currentData={{}}
                querryFunction={addProject}
                propertyList={Task}
                queryKeyValue={TASK}
                navigateTo="/roomView"
            />
        </section>
    )
}
