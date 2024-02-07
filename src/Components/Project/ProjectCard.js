import CardRow from "../GenericComponents/CardRow"

export const ProjectCard = ({ item }) => {
    return (<> <div className="block w-full p-6 bg-gray-700 border border-gray-200 rounded-lg shadow">
        <h1 className="mb-2 text-md font-bold tracking-tight text-white">
            {item.project}
        </h1>
        <ul>
            <CardRow
                name={"Project holder :"}
                value={item.companyID}
            />
        </ul>
    </div></>)
}