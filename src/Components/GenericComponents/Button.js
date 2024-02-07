import React from 'react'

export default function Button({ buttonName, onPress, type, autofocus = false }) {
    return (
        <button
            autoFocus={autofocus}
            onClick={onPress}
            type={type}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-blue-800">
            {buttonName}
        </button>
    )
}
