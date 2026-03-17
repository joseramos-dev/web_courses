import { useState } from "react"
import { ComponentRegister } from "../components/ComponentRegister"

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!email || !password) {
            setError('Por favor, complete todos los campos.')
            return
        }
        setError('')

        console.log("Registering:", { username, email, password })
    }

    const loginClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        console.log("Redirect to login page")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-900">
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