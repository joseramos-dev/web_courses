import { useState } from 'react'
import {CommponentLogin} from '../components/ComponentLogin'




const Login = () => {
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
        console.log("Email:", email, "Password:", password)
        // Aquí puedes agregar la lógica para enviar los datos de inicio de sesión al backend
    }

    const registerClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        console.log("Redirect to register page")
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-green-900">
                <CommponentLogin 
                    email={email} 
                    setEmail={setEmail} 
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