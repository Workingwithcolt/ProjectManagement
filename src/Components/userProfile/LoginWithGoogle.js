import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import LoadingSpinner from "../GenericComponents/LoadingSpinner";
import { useState } from "react";
import ErrorFromFirebase from "../GenericComponents/FirebaseErrorMessage";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { auth } from "../../FirebaseHelpers/firebase-config";

const provider = new GoogleAuthProvider();

function LoginWithGoogle({ onAuthSuccess }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const navigate = useNavigate()

    const loginWithGoogle = async () => {
        try {
            setIsLoading(true);
            await signInWithPopup(auth, provider);
            await onAuthSuccess();
            navigate('/home')
        }
        catch (e) {
            setError(e);
        }
    }

    if (error) {
        return <ErrorFromFirebase error={error} />
    }

    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }

    return (
        <button
            type="button"
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-2 text-white   focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-800 hover:bg-primary-700 focus:ring-primary-800">
            <span>
                <FcGoogle size={25} />
            </span>
            <span className="text-lg">
                Sign In
            </span>
        </button>
    );
}

export default LoginWithGoogle;