import React, { useContext } from 'react'
import { Projects, Room } from '../../Helper/Extraproperties';
import { PROJECTS, endpoints } from '../../FirebaseHelpers/ApiInterface';
import ChangeEndpoints from '../GenericComponents/ChangeEndPoint';
import { checkAdmin } from '../../Helper/helper';
import { UserContext } from '../Contexts/CurrentUserContext';

export default function ProjectForm() {
    const { currentUserAdmin } = useContext(UserContext);
    const addProject = async (state) => {
        let isAdmin = checkAdmin(currentUserAdmin.selectedCompany.value);
        if (!isAdmin) {
            return Promise.reject("Only Admin Can Create Project !!")
        }
        state.companyID = currentUserAdmin.selectedCompany.label;
        return await endpoints.Project.addDocument(state)
    }

    return (
        <section className='h-full bg-gray-900 py-8 px-8 text-white'>
            <ChangeEndpoints
                formName={"Project Form"}
                addButtonText={"Add new Project"}
                currentData={{}}
                querryFunction={addProject}
                propertyList={Projects}
                queryKeyValue={PROJECTS}
                navigateTo="/home"
            />
        </section>
    )
}
