import { useState } from "react"
import { registerUser } from "../services/userService"
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";

function RegisterPage(){
    const [userToRegister, setUserToRegister] = useState({})
    const [error, setError] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError()
        console.log(userToRegister);
        try {
            await registerUser(userToRegister)
            toast.success('Te has registrado correctamente')
            e.target.reset()
        } catch (e) {
            setError('Error al iniciar sesion')
        }
    }
    
    const handleInputChange = (e) => {
        let name = e.target.id
        let value = e.target.value
        setUserToRegister({
            ...userToRegister,
            [name]: value
        })
    }

    const handleBlur = (e) =>{
        if (e.target.value.length === 0) {
            e.target.classList.add('border-b-2')
            e.target.classList.add('border-b-red-500')
        }else{
            e.target.classList.remove('border-b-2')
            e.target.classList.remove('border-b-red-500')
        }
    }

    return(
        <div className="flex items-center justify-center bg-green-500 items-center min-h-screen">
            
            <Toaster position="bottom-right" reverseOrder={false}/>

            <form id="form" className="bg-white shadow-lg rounded-xl my-2 px-8 pt-6 pb-8 mb-4 mt-28" onSubmit={handleSubmit}>

                <div className="flex justify-center flex-wrap-reverse mt-4 bg-green-500">
                    <img className="absolute w-20 h-20 bg-green-500 rounded-full" src="/logo.png" alt="" />
                </div>

                <div>
                <h1 className="text-center text-3xl font-semibold my-4">Registro</h1>
                {error && <p className='duration-150 text-center font-semibold text-white bg-red-500 my-2 rounded'>Error al registrar</p>}    
                </div>  

                <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="name">
                    Nombre
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="Nombre" onChange={handleInputChange} onBlur={handleBlur}/>
                </div>
                
                <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="surname">
                    Apellido
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Apellido" onChange={handleInputChange} onBlur={handleBlur}/>
                </div>
                
                <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="nickname">
                    Apodo
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nickName" type="text" placeholder="Apellido" onChange={handleInputChange} onBlur={handleBlur}/>
                </div>

                <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email" onChange={handleInputChange} onBlur={handleBlur}/>
                </div>

                <div className="mb-6">
                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="password">
                    Contraseña
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="contraseña" onChange={handleInputChange} onBlur={handleBlur}/>
                </div>

                <div className="flex justify-center my-2">
                    <p>
                        ¿Ya estás registrado? <Link to='/login' className="text-indigo-500 font-semibold">Inicia Sesión</Link>
                    </p>
                </div>

                <div className="flex justify-center">
                    <button className="duration-300 font-semibold py-2 px-4 rounded-3xl bg-green-500 text-white disabled:opacity-25"
                    type="submit" disabled={Object.keys(userToRegister).length == 5 ? false : true}>
                        Registrar
                    </button>
                </div>
            </form>
        </div>   
    )
}

export default RegisterPage