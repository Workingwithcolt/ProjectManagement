import React, { useState, createContext } from "react";

const authContextDefaultvalue = {
  currentUserObject: {},
};

export const AuthContext = createContext(authContextDefaultvalue);

// This component takes 2 parameters which are used to navigate the app
// based on the current state of the Authentication.
// login props represent the component to display when no user is logged-in
// dashboard props represent the component to display when a user succesfully
// logs in.

export function Auth({ login, dashboard }) {

  const [currentUser, setCurrentUser] = useState(null)
  return <>
    < AuthContext.Provider
      value={{
        currentUserObject: currentUser, setCurrentUser
      }}>

      {currentUser === null ? login : dashboard}

    </ AuthContext.Provider> </>;
}