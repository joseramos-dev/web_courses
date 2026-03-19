import { use, useEffect, useMemo, useState } from 'react'
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { ComponentProfileCoursesCard as ComponentProfileMenuCard, ComponentProfileInfoCard } from '../components/ComponentsProfile';
import { logout } from '../services/authServices';
import EditProfileInfoCard from './EditProfile';
import ComponentNoLogged from '../components/ComponentNoLogged';
import { type InterfaceUser } from '../Interfaces/InterfaceUser';

//diseño: dos columnas:
//izquierda: foto de perfil, nombre, email, botón de editar perfil
//derecha: información adicional, como cursos inscritos, progreso, etc.

const Profile = () => {
    const navigate = useNavigate();

    const userData:InterfaceUser | null = useMemo(() => {
        const raw = localStorage.getItem('userData')
        if (!raw) return null
        try {
            return JSON.parse(raw)
        } catch {
            return null
        }
    }, [])

    const onLogout = () => {
        logout()
        navigate('/login')
    }


    if (!userData) {
        return <ComponentNoLogged />
    }
    return (
        <div className="min-h-screen bg-green-800 p-8">
            <div className="max-w-6xl mx-auto flex flex-col gap-8">
                <ProfileUserCard navigate={navigate} user={userData} onLogout={onLogout} />
                <ProfileMenuCard navigate={navigate} user={userData}/>
            </div>
        </div>
    )
}

const ProfileUserCard = (
    { navigate, user, onLogout }:
        { navigate: NavigateFunction, user: InterfaceUser, onLogout: () => void }
) => {
    return (
        ComponentProfileInfoCard({ user, onLogout })
    )
}

const ProfileMenuCard = (
    { navigate, user }:
        { navigate: NavigateFunction; user: InterfaceUser }
) => {
    return (
        ComponentProfileMenuCard({ navigate, user })
    )
}

export default Profile