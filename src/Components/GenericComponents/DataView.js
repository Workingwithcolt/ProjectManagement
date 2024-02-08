import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

function DataView({ queryFunction, queryKey, getSearchableValue, Card, DetailedElement, newDataButton }) {
    const [searchString, setSearchString] = useState("");
    const [selectedItem, setSelectedItem] = useState(undefined);

    var { data, isError, isLoading, error } = useQuery(queryKey, async () => await queryFunction());

    if (data && searchString !== "") {
        data = data.filter((current) => {
            var valueToSearchIn = getSearchableValue(current).toLowerCase();
            var valueToSearch = searchString.toLowerCase();
            return valueToSearchIn.includes(valueToSearch);
        })
    }

    if (selectedItem && DetailedElement) {
        return (
            <DetailedElement item={selectedItem} setSelectedItem={setSelectedItem} />
        )
    }

    if (isLoading) {
        return (
            <div className="flex w-full h-full justify-center items-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex flex-col p-2">
                <div className="p-4 mb-4 text-sm text-white text-center rounded-lg bg-gray-700" role="alert">
                    {error}
                </div>
            </div>
        )
    }

    if (data) {
        return (
            <div className="flex flex-col gap-2 h-full">
                <div className="flex flex-wrap w-full items-center gap-5 mb-2">
                    <div className="mx-auto">
                        <div>Count: {data.length} </div>
                    </div>
                    <input className="flex-grow border mt-4 mb-4 text-white text-sm rounded-sm focus:ring-primary-600 focus:border-primary-600 block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400"
                        onChange={(e) => setSearchString(e.target.value)}
                        placeholder="Search"
                    />

                    <div className="mx-auto">
                        {newDataButton}
                    </div>
                </div>
                <div className="flex-1">
                    <div className="h-full overflow-y-scroll">
                        {
                            data && data.length === 0 ?
                                <div className="flex w-full justify-center">
                                    No Data To Display
                                </div>
                                :
                                <div className="grid gap-2 lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
                                    {
                                        data.map((item, index) =>
                                            <div className="w-full" key={index} onClick={() => setSelectedItem(item)}>
                                                <Card item={item} />
                                            </div>
                                        )
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default DataView;