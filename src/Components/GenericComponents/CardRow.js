import React from 'react'

export default function CardRow({ name, value }) {
    return (
        <li className="block p-0">
            <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium  truncate text-white">
                        {name}
                    </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-white truncate">
                    {value}
                </div>
            </div>
        </li>
    )
}
