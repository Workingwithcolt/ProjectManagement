export const GenericSelect = ({currentValue,id, opt, title, handleClick }) => {
    return (
        <>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an {title}</label>
            <select id={id}  value={currentValue} onChange={handleClick}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected={true} value={"none"}>Select {title}</option>
                {
                    opt.map((element,index) => {
                   
                        return (
                            <option key={index} value={JSON.stringify(element)}>{element.label}</option>
                        )
                    })
                }
            </select>
        </>
    )
}