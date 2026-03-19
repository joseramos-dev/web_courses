import { useMemo, useEffect, useState, use, useRef } from 'react'
import { AuthBoxInput } from '../components/ComponentAuthShared'
import { useNavigate } from 'react-router-dom';


const EditProfileInfoCard = () => {
        const navigate = useNavigate();

    const id = useRef(-1)
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userData = useMemo(() => {
        const raw = localStorage.getItem('userData')
        if (!raw) return null
        try {
            return JSON.parse(raw)
        } catch {
            return null
        }
    }, [])

    useEffect(() => {
        if (!userData || localStorage.getItem('isAuthenticated') !== 'true') {
            navigate('/login')
        }
        try {
            const { id, username, email, password } = userData
            id.current = id
            setUserName(username || '')
            setEmail(email || '')
            setPassword(password || '')
        } catch { }
    }, [userData, navigate])

    const onCancel = () => {
        navigate('/profile')
    }
    const onSave = () => {
        navigate('/profile')
        
    }

    return (
        <div>
            <AuthBoxInput
                label="Username"
                text={userName}
                onInputChange={(e: string) => { setUserName(e) }}
                type="text" />
            <AuthBoxInput
                label="Email"
                text={email}
                onInputChange={(e: string) => { setEmail(e) }}
                type="email" />
            <AuthBoxInput
                label="Password"
                text={password}
                onInputChange={(e: string) => { setPassword(e) }}
                type="password" />
            <div className="flex gap-4 mt-4" >
                <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Changes</button>
                <button className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
            </div>

        </div>
    )
}

export default EditProfileInfoCard