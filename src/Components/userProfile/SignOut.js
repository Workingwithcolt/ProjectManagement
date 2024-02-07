import { useContext } from "react";
import { auth } from "../../FirebaseHelpers/firebase-config";
import { AuthContext } from "../../Auth";
import { useNavigate } from "react-router-dom";
import { LiaSignOutAltSolid } from "react-icons/lia";

export function SignOut() {
    const { setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const logout = async () => {
        try {
            // If another user log-in from the same tab.
            // We want the sessionStorage to be cleared
            // before he can see some lingering value.
            sessionStorage.clear();
            await auth.signOut();
            setCurrentUser(null)
            navigate("/")
        }
        catch (e) { console.log(e); }
    }

    return (
        <button onClick={logout}>
            <LiaSignOutAltSolid size={25} />
        </button>
    )
}