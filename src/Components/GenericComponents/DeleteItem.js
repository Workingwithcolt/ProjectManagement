import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import LoadingSpinner from './LoadingSpinner';
import { useNavigate } from 'react-router-dom';

export default function DeleteItem({ querryFunction, queryKeyValue, navigateTo, setSelectedItem }) {
    const [verify,setVerify] = useState(false)
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleRedirect = (navigateTo) => {
        navigate(navigateTo);
    };

    const { isLoading, error, mutate } = useMutation(
        async () => await querryFunction(),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({
                    predicate: (query) => query.queryKey.includes(queryKeyValue),
                });
                setSelectedItem(undefined)
            },
        }
    );

    if (isLoading) {
        return (
            <div className="flex w-full h-full justify-center items-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (error && error !== "") {
        return (
            <div className="flex flex-col p-2">
                <div className="p-4 mb-4 text-sm text-white text-center rounded-lg bg-gray-700" role="alert">
                    {error.message}
                </div>
                <button onClick={() => handleRedirect(navigateTo)}>
                    ok
                </button>
            </div>

        );
    }

    if (verify) {
        return (
            <>
                <div className="absolute top-5 left-0 bottom-5 flex h-full w-full items-center justify-center">
                    <div className="relative p-4">
                        <div className="relative rounded-lg shadow bg-gray-700">
                            <div className="p-6">
                                <h3 className="mb-5 mt-3 text-center text-md font-normal text-white">Are you sure you want to delete?</h3>
                                <div className="flex w-full mt-4">
                                    <button onClick={() => {
                                        setVerify(false)
                                        mutate()
                                    }}
                                        data-modal-hide="popup-modal"
                                        type="button"
                                        className="w-1/2 text-white bg-primary-800 hover:bg-primary-700 focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => setSelectedItem(undefined)}
                                        data-modal-hide="popup-modal"
                                        type="button"
                                        className="w-1/2 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <button onClick={() => setVerify(true)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-auto dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <MdDeleteOutline />
        </button>
    )
}
