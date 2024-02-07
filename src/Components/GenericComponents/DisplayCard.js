function DisplayCard({ item }) {
    return (
        <div className="block max-w-sm p-6 bg-gray-700 border border-gray-200 rounded-lg shadow">
            <h5 className="mb-2 text-md font-bold tracking-tight text-white">
                {item.name}
            </h5>
        </div>
    )
}

export default DisplayCard