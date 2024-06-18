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
        <div className="flex justify-center h-screen">
            
            <Toaster position="bottom-right" reverseOrder={false}/>

            <form className="w-4/5 md:2/4 lg:w-2/5" onSubmit={handleSubmit}>

                <div>
                <h1 className="text-center text-white text-3xl font-semibold my-4">Registro</h1>
                {error && <p className='duration-150 text-center font-semibold text-white bg-red-500 my-2 rounded'>Error al registrar</p>}    
                </div>  

                <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2" htmlFor="name">
                    Nombre
                </label>
                <input className="appearance-none border-b w-full bg-transparent text-white leading-tight focus:outline-none focus:shadow-outline" 
                id="firstName" type="text" onChange={handleInputChange} onBlur={handleBlur}/>
                </div>
                
                <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2" htmlFor="surname">
                    Apellido
                </label>
                <input className="appearance-none border-b w-full bg-transparent text-white leading-tight focus:outline-none focus:shadow-outline" 
                id="lastName" type="text" onChange={handleInputChange} onBlur={handleBlur}/>
                </div>
                
                <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2" htmlFor="nickname">
                    Apodo
                </label>
                <input className="appearance-none border-b w-full bg-transparent text-white leading-tight focus:outline-none focus:shadow-outline" 
                id="nickName" type="text" onChange={handleInputChange} onBlur={handleBlur}/>
                </div>

                <div className="mb-4">
                <label className="block text-gray-400 text-sm mb-2" htmlFor="email">
                    Email
                </label>
                <input className="appearance-none border-b w-full bg-transparent text-white leading-tight focus:outline-none focus:shadow-outline" 
                id="email" type="text" onChange={handleInputChange} onBlur={handleBlur}/>
                </div>

                <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2" htmlFor="password">
                    Contraseña
                </label>
                <input className="appearance-none border-b w-full bg-transparent text-white leading-tight focus:outline-none focus:shadow-outline" 
                id="password" type="password" onChange={handleInputChange} onBlur={handleBlur}/>
                </div>

                <button className="w-full font-semibold py-2 px-4 rounded-3xl bg-green-500 text-white disabled:opacity-25 my-4"
                type="submit" disabled={Object.keys(userToRegister).length == 5 ? false : true}>
                    Registrar
                </button>

                <div className="flex justify-center my-2">
                    <p className="text-white">
                        ¿Ya estás registrado? 
                        <Link to='/login' className="text-indigo-500 font-semibold ml-2">Inicia Sesión</Link>
                    </p>
                </div>
            </form>
        </div>   
    )
}

export default RegisterPage