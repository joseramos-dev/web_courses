import { useEffect, useState } from "react"
import { ComponentRegister } from "../components/ComponentRegister"
import { useNavigate } from "react-router-dom"
import { checkIfLogged } from "../services/LocalStorageUser"
import { register } from "../services/authServices"


const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
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
        if (!email || !password) {
            setError('Por favor, complete todos los campos.')
            return
        }
        setError('')
        register(username, email, password).then(() => {
            console.log("Registering:", { username, email, password })
        navigate('/login')
        }).catch((err) => {
            console.error("Login failed:", err)
            setError('Error en el registro. Inténtalo de nuevo.')
        })
        
    }

    const loginClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        console.log("Redirect to login page")
        navigate('/login')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-900">
            <ComponentRegister
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                loginClickHandler={loginClickHandler}
                handleSubmit={handleSubmit}
                error={error}
            />
        </div>
    )
}

export default Register