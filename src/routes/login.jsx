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
        <div className="flex justify-center">

            <Toaster position="bottom-right" reverseOrder={false}/>

            <form className="w-4/5 md:2/4 lg:w-2/5" onSubmit={handleSubmit}>

            <div>
            <h1 className="text-center text-3xl text-white font-semibold my-4">Iniciar Sesión</h1>
            {error && <p className='text-center font-semibold text-white bg-red-500 my-2 rounded'>Error al iniciar Sesión</p>}    
            </div>               

            <div className="mb-4">
            <label className="text-gray-400 text-sm mb-2" htmlFor="email">
                Email
            </label>

            <input className="appearance-none border-b w-full bg-transparent text-white leading-tight focus:outline-none focus:shadow-outline" 
            id="email" disabled={user ? true : false} type="text" onBlur={handleBlur} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="mb-4">
            <label className="text-gray-400 text-sm mb-2" htmlFor="password">
                Contraseña
            </label>
            
            <input className="appearance-none border-b w-full bg-transparent text-white leading-tight focus:outline-none focus:shadow-outline" 
            id="password" disabled={user ? true : false} type="password" onBlur={handleBlur} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"/>
            </div>

            <button className="w-full font-semibold py-2 px-4 rounded-3xl bg-green-500 text-white disabled:opacity-25" 
            type="submit" disabled={isValid}>
                Iniciar Sesión
            </button>

            <div className="flex justify-center my-2">
                <p className="text-white">
                    ¿No tienes cuenta? 
                    <Link to='/register' className="text-indigo-500 font-semibold ml-2">Inicia Sesión</Link>
                </p>
            </div>

            </form>
        </div>
    )
}

export default LoginPage