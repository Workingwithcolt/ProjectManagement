import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../userProfile/LoginPage'
import { Home } from './Home'
import GenericBodyCard from './GenericBodyCard'
import { SignOut } from '../userProfile/SignOut'
import { Userjoin } from '../User/UserJoin'
import { CreateCompany } from '../User/CreateCompany'
import { CreateUser } from '../User/CreateUser'
import RequestedUsers from '../RequestedUser/RequestedUsers'
import { ManagerView } from '../Admin/Managers'
import ProjectForm from '../Project/ProjectForm'
import { ProjectView } from '../Project/ProjectView'
import UserView from '../User/UserView'
import TaskForm from '../Task/TaskForm'
import { ShowTask } from '../Task/ShowTask'

function Routers() {
    return (
        <Routes>
            <Route path='/home'
                element={
                    <GenericBodyCard>
                        <Home />
                    </GenericBodyCard>} />

            <Route path='/'
                element={
                    <LoginPage />
                } />

            <Route path='/createUser' element={
                <GenericBodyCard>
                    <CreateUser />
                </GenericBodyCard>
            } />

            <Route path='/createCompany' element={
                <GenericBodyCard>
                    <CreateCompany />
                </GenericBodyCard>
            } />
            <Route path='/joinCompany' element={
                <GenericBodyCard>
                    <Userjoin />
                </GenericBodyCard>
            } />

            <Route path='/RequestedUser' element={
                <GenericBodyCard>
                    <RequestedUsers />
                </GenericBodyCard>
            } />

            <Route path='/Managers' element={
                <GenericBodyCard>
                    <ManagerView />
                </GenericBodyCard>
            } />

            <Route path='/ProjectForm' element={
                <GenericBodyCard>
                    <ProjectForm />
                </GenericBodyCard>
            } />

            <Route path='/ProjectView' element={
                <GenericBodyCard>
                    <ProjectView />
                </GenericBodyCard>
            } />

            <Route path='/UserView' element={
                <GenericBodyCard>
                    <UserView />
                </GenericBodyCard>
            } />

            <Route path='/TaskForm/:id' element={
                <GenericBodyCard>
                    <TaskForm />
                </GenericBodyCard>
            } />

            <Route path='/ShowTask/:id' element={
                <GenericBodyCard>
                    <ShowTask />
                </GenericBodyCard>
            } />

            <Route path='/signOut'
                element=
                {<SignOut />} />
        </Routes>
    )
}

export default Routers