import { useQueryClient } from "@tanstack/react-query";
import { TASK, endpoints } from "../../FirebaseHelpers/ApiInterface";
import { ACCEPTED } from "../../Helper/helper";
import CardRow from "../GenericComponents/CardRow";
import { useState } from "react";
import LoadingSpinner from "../GenericComponents/LoadingSpinner";
import Button from "../GenericComponents/Button";

export const TaskCard = ({ item }) => {
    const [loading, isLoading] = useState(false)
    const queryClient = useQueryClient();

    const doneTask = async () => {
        try {
            isLoading(true)
            item.status = ACCEPTED;
            await endpoints.Task.updateDocument(item.id, item);
            const InvalidateUser = async () => {
                await queryClient.invalidateQueries({
                    predicate: (query) => query.queryKey.includes(TASK),
                })
            }
            InvalidateUser();
            isLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    if (loading) {
        return <LoadingSpinner />
    }

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
                <Button
                    buttonName={"Done"}
                    type={"button"}
                    onPress={doneTask}
                />
            </ul>
        </div></>
    )
}