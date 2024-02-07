import CardRow from "../GenericComponents/CardRow";

export const TaskCard = ({ item }) => {
    console.log(item);
    return (
        <><div className="block w-full p-6 bg-gray-700 border border-gray-200 rounded-lg shadow">
            <ul>
                <CardRow
                    name={"Name :"}
                    value={item.Task}
                />
                <CardRow
                    name={"Detail :"}
                    value={item.taskDetail}
                />
                 <CardRow
                    name={"status :"}
                    value={item.status}
                />
            </ul>
        </div></>
    )
}