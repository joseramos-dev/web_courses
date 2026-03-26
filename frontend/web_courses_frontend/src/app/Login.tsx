import { useState, useEffect, use } from 'react'
import { useNavigate } from "react-router-dom"
import { CommponentLogin } from '../components/ComponentLogin'
import { login } from '../services/authServices'
import { checkIfLogged } from '../services/LocalStorageUser'


const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (
            checkIfLogged()
        ) {
            navigate('/profile')
        }
    }, [navigate])



    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!userName || !password) {
            setError('Por favor, complete todos los campos.')
            return
        }
        setError('')
        login(userName, password).then(() => {
            navigate('/profile')
        }).catch((err) => {
            console.error("Login failed:", err)
            setError('Credenciales inválidas. Inténtalo de nuevo.')
        })

    }

    const registerClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        console.log("Redirect to register page")
        navigate('/register')
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-green-900">
            <CommponentLogin
                user={userName}
                setUser={setUserName}
                password={password}
                setPassword={setPassword}
                registerClickHandler={registerClickHandler}
                handleSubmit={handleSubmit}
                error={error}
            />
        </div>
    )
}





export default Login