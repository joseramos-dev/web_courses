import { useState } from "react"
import { ComponentRegister } from "../components/ComponentRegister"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!email || !password) {
            setError('Por favor, complete todos los campos.')
            return
        }
        setError('')

        console.log("Registering:", { username, email, password })

        // Guardar datos de usuario recién registrado (para demo).
        // NO almacenar contraseña sin cifrado en producción.
        const registered = { username, email }
        localStorage.setItem('newRegisteredUser', JSON.stringify(registered))
        localStorage.setItem('newRegisteredPass', password)

        navigate('/login')
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