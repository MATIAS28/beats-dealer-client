export const NotFound = ({name}) => {
    return(
        <div className="flex justify-center items-center w-full min-h-screen">
            <div className="flex items-center p-2 md:p-0">
                <img src="/logo.png" className="w-32 md:w-52 top-7"/>
                <h1 className="text-xl sm:text-lg md:text-3xl text-center font-bold">No se han encontrado {name}</h1>
            </div>
        </div>
    )
}