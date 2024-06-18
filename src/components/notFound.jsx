export const NotFound = ({name}) => {
    return(
        <div className="flex justify-center items-center w-full h-72 text-gray-200">
            <div className="w-fit">
                <h1 className="text-center text-7xl">·404·</h1>
                <h2 className="text-lg font-light">No se han encontrado {name}</h2>
            </div>
        </div>
    )
}