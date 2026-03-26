import { useEffect, useMemo, useState } from 'react'
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { ComponentProfileCoursesCard, ComponentProfileInfoCard } from '../components/ComponentsProfile';
import { logout } from '../services/authServices';
import ComponentNoLogged from '../components/ComponentNoLogged';
import { type InterfaceUser } from '../Interfaces/InterfaceUser';
import ModalDialog from '../components/ModalDialog';
import toast from 'react-hot-toast';
import { updateUser } from '../services/UserServices';



const Profile = () => {
    const navigate = useNavigate();
    //los posibles valores seran: "none","name, "email", "password"
    const [state, setState] = useState<string>('None')
    const [userData, setUserData] = useState<InterfaceUser | null>(null)


    useMemo(() => {
        const raw = localStorage.getItem('userData')
        console.log(raw)
        if (!raw) return null
        try {
            return setUserData(JSON.parse(raw))
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
                <ComponentProfileInfoCard
                    user={userData}
                    onLogout={onLogout}
                />
                <ComponentProfileCoursesCard
                    navigate={navigate}
                    user={userData}
                    setModalState={(value: string) => setState(value)}
                />
                {
                    state === 'None' ? null : (
                        <ModalDialog
                            label={state}
                            value={userData[state as keyof InterfaceUser] as string}
                            setState={(s: string) => setState(s)}
                            onSubmitBehavior={(newValue: string) => {
                                const newUserData = { ...userData, [state]: newValue }
                                updateUser(newUserData).then(() => {
                                    toast.success(`${state} updated successfully: ${newValue}`);
                                    setState('None')
                                    setUserData(newUserData)
                                }).catch((err) => {
                                    console.error("Login failed:", err)
                                })
                            }}
                            listOptions={state === "role" ? ["student", "admin", "instructor"] : null}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default Profile