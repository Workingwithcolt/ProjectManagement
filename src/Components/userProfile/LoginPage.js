import { auth } from "../../FirebaseHelpers/firebase-config";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth";
import LoginWithGoogle from "./LoginWithGoogle";
import CheckCurrentUser from "./CheckCurrentUser";


export function LoginPage() {
    const { setCurrentUser } = useContext(AuthContext);
    const [checkCurrent, setCheckCurrent] = useState(true);

    const onAuthSuccess = async () => {
        setCurrentUser(auth.currentUser);
    }
   
    if (checkCurrent) {
        // check if current user is present.
        return (
            <CheckCurrentUser
                onAuthSuccess={onAuthSuccess}
                showLogin={() => setCheckCurrent(false)}
            />
        )
    }

    return (
        <section className="min-h-screen  bg-gray-900">
            <div className="flex flex-col min-h-screen items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h1 className="flex items-center mb-6 text-2xl font-semibold text-white">
                    Task Manager
                </h1>
                <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-center text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            <LoginWithGoogle onAuthSuccess={onAuthSuccess} />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}