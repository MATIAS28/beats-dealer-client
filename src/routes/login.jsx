import { useEffect, useState } from 'react'
import '../assets/css/form.css'
import { loginUser } from '../services/userService'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/slices/user'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom'

function LoginPage(){
    const {user} = useSelector((state) => state.user)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isValid, setIsValid] = useState(true)
    const [error, setError] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        if (email?.length > 0 && password?.length >= 8 && !user) {
            setIsValid(false)
        }else{
            setIsValid(true)
        }
    }, [email, password, user])

    const handleBlur = (e) =>{
        if (e.target.value.length === 0) {
            e.target.classList.add('border-b-2')
            e.target.classList.add('border-b-red-500')
        }else{
            e.target.classList.remove('border-b-2')
            e.target.classList.remove('border-b-red-500')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsValid(true)
        setError(null)
        try {
            const user = await loginUser({email: email, password: password})
            dispatch(login(user))
            toast.success('Sesión iniciada')
            e.target.reset()
        } catch (e) {
            setIsValid(false)
            setError(e.response.data.message)
        }
    }

    return(
        <div className="flex justify-center bg-green-500 items-center min-h-screen">

            <Toaster position="bottom-right" reverseOrder={false}/>

            <form id="form" className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>

            <div className="flex justify-center flex-wrap-reverse mt-4 bg-green-500">
                <img className="absolute w-20 h-20 bg-green-500 rounded-full" src="/logo.png" alt="" />
            </div>

                <div>
                <h1 className="text-center text-3xl font-semibold my-4">Iniciar Sesión</h1>
                {error && <p className='text-center font-semibold text-white bg-red-500 my-2 rounded'>Error al iniciar Sesión</p>}    
                </div>               

                <div className="mb-4">
                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="email">
                    Email
                </label>

                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="email" disabled={user ? true : false} type="text" onBlur={handleBlur} onChange={(e) => setEmail(e.target.value)} placeholder="email"/>
                </div>

                <div className="mb-6">
                <label className="block text-gray-800 text-sm font-bold mb-2" htmlFor="password">
                    Contraseña
                </label>
                
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                id="password" disabled={user ? true : false} type="password" onBlur={handleBlur} onChange={(e) => setPassword(e.target.value)} placeholder="contraseña" autoComplete="current-password"/>
                </div>

                <div className="flex justify-center my-2">
                    <p>
                        ¿No tienes cuenta? <Link to='/register' className="text-indigo-500 font-semibold">Inicia Sesión</Link>
                    </p>
                </div>

                <div className="flex items-center justify-center">
                <button className="duration-300 font-semibold py-2 px-4 rounded-3xl bg-green-500 text-white disabled:opacity-25" 
                type="submit" disabled={isValid}>
                    Iniciar Sesión
                </button>
                </div>

            </form>
        </div>
    )
}

export default LoginPage