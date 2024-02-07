import React from 'react'

function Footer() {
    return (
        <footer className="w-screen shadow bg-gray-900">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-400 sm:text-center">
                    © {new Date().getFullYear()}
                    <span className="mx-2">
                        Opankys Inc.
                    </span>
                    <span className='mx-2'>
                        All Rights Reserved.
                    </span>
                </span>
            </div>
        </footer>
    )
}

export default Footer