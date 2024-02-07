import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});
const SESSION_STORAGE_KEY_SCHOOL = "currentUser";

export function UserContextProvider({ children }) {
    const [currentUserAdmin, changeCurrentUserAdmin] = useState({ name: "" });

    useEffect(() => {
        var currentUser = sessionStorage.getItem(SESSION_STORAGE_KEY_SCHOOL);

        if (currentUser) {
            changeCurrentUserAdmin(JSON.parse(currentUser));
        }
    }, [])

    const setCurrentUserAdmin = (currentUser) => {
        sessionStorage.setItem(
            SESSION_STORAGE_KEY_SCHOOL,
            JSON.stringify(currentUser));

        changeCurrentUserAdmin(currentUser);
    }

    return (
        <UserContext.Provider value={{ currentUserAdmin, setCurrentUserAdmin }} >
            {children}
        </UserContext.Provider>
    )
}