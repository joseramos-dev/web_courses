import type { NavigateFunction } from "react-router-dom"
import type { InterfaceUser } from "../Interfaces/InterfaceUser"
import { FaBook, FaChartBar, FaCog, FaEnvelope, FaEye, FaEyeSlash, FaSignOutAlt, FaUserCircle } from "react-icons/fa"
import { ComponentPageSwitcher } from "./ComponentPageSwitcher"
import { useState } from "react"



export const ComponentProfileInfoCard = (
    { user, onLogout }: { user: InterfaceUser; onLogout: () => void }
) => {
    console.log("Rendering ProfileInfoCard with user:", user)

    return (
        <div className="flex-1 w-full bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-left md:mx-auto">
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                <FaUserCircle className="w-full h-full text-gray-100" />
            </div>
            <div className="flex-2 w-auto p-2 md:p-4  mx-4 text-center md:text-left">
                <h2 className="text-4xl font-bold">{user.name}</h2>
                <h3 className="text-2xl text-gray-600 flex items-center justify-center md:justify-start gap-2">
                    <FaEnvelope className="text-xl text-gray-500" />
                    {user.email}
                </h3>
                <p className="text-gray-500">Permisos: {user.role}</p>
                <p className="text-gray-500">Miembro desde: {user.date_creation}</p>
            </div>
            <button className=" w-auto bg-gray-500 hover:bg-red-700 text-white text-center font-bold py-2 px-4 rounded md:ml-auto self-center md:self-center justify-end flex items-center gap-2" onClick={onLogout}>
                <FaSignOutAlt />
                Log Out
            </button>
        </div>
    )
}

export const ComponentProfileCoursesCard = ({ navigate, user }: { navigate: NavigateFunction; user: InterfaceUser }) => {

    return (
        <div className="w-full bg-white rounded-lg shadow-md flex flex-col">
            <ComponentPageSwitcher components={[
                // TODO:   se mostrara el historial de cursos, además de tus preferencias (cursos favoritos, cursos en progreso, cursos finalizados ...etc)
                { labelName: "Preferencias", icon: <FaChartBar />, component: <ComponentPreferencias /> },
                // TODO: Además, se podra cambiar la info de usuario (saldra una pantalla con un formulario para cada tipo de dato)en configuración se modificaran idioma, tema ...etc.
                { labelName: "Configuration", icon: <FaCog />, component: <ComponentConfiguration user={user} /> }
            ]} />
        </div>
    )
}



const ComponentPreferencias = () => {
    return (
        <   div className="w-full h-50 flex items-center justify-center text-2xl font-bold text-gray-700">
            PREFERENCIAS
        </div>
    )
}

const ComponentConfiguration = ({ user }: { user: InterfaceUser }) => {
    return (
        <div className="w-full px-8 py-4 h-80 flex flex-col items-center justify-center text-2xl font-bold text-gray-700">
            {
                Object.entries(user).map(([key, value]) => (
                    <ComponentConfigurationItem key={key} label={key} value={String(value)} />
                ))
            }
        </div>
    )
}

const ComponentConfigurationItem = ({ label, value }: { label: string, value: string }) => {

    const [editedValue, setEditedValue] = useState(value)
    const [onVisibility, setVisibility] = useState(true)

    return (
        <div className="w-full h-40  flex flex-row items-center justify-between text-lg font-medium text-gray-700 border-b border-gray-300 px-16">
            <label className="flex-2 flex items-center">
                {label}
            </label>
            <div className="relative flex-1 mx-4">
                <input
                    className="w-full border border-gray-300 rounded px-2 py-1 pr-10 focus:outline-none focus:ring-2 focus:ring-green-600"
                    type={ (label === "password" && onVisibility) ? "password" : "text"}
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                />
                {label === "password" && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer" onClick={() => setVisibility(!onVisibility)}>
                        {onVisibility ? <FaEyeSlash /> : <FaEye />}
                    </div>
                )}
            </div>

        </div>
    )

}