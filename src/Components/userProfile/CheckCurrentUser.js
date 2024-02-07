import { useEffect } from "react";
import { auth } from "../../FirebaseHelpers/firebase-config";
import { Home } from "../GenericComponents/Home";
import GenericBodyCard from "../GenericComponents/GenericBodyCard";

// This component is added to check if there is any current user
// logged-in. This happens when we refresh the page after user
// successfully logs in.

// We need saperate component because we dont want the OnAuthChanged
// callback to be active once we check for user login status.

// Once the component is unloaded, the useeffect will make sure that
// the callback is unregistrerd.
export default function CheckCurrentUser({ onAuthSuccess, showLogin }) {
    useEffect(() => {
        const authChanged = (currentUser) => {
            currentUser ? onAuthSuccess() : showLogin();
        }

        return auth.onAuthStateChanged(authChanged);
    }, [onAuthSuccess, showLogin])

    return <><GenericBodyCard><Home /></GenericBodyCard></>;
}