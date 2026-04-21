import type { InterfaceUser } from "../Interfaces/InterfaceUser"
import { FaChartBar, FaCog, FaEnvelope, FaSignOutAlt, FaUserCircle } from "react-icons/fa"
import { ComponentPageSwitcher } from "./ComponentPageSwitcher"


export const ComponentProfileInfoCard = (
    { user, onLogout }: { user: InterfaceUser; onLogout: () => void }
) => {


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

export const ComponentProfileCoursesCard = (
    { user, setModalState }:
        { user: InterfaceUser; setModalState: (value:string) => void }
) => {

    return (
        <div className="w-full bg-white rounded-lg shadow-md flex flex-col">

            <ComponentPageSwitcher components={[
                // TODO:   se mostrara el historial de cursos, además de tus preferencias (cursos favoritos, cursos en progreso, cursos finalizados ...etc)
                { labelName: "Preferencias", icon: <FaChartBar />, component: <ComponentPreferencias /> },
                // TODO: Además, se podra cambiar la info de usuario (saldra una pantalla con un formulario para cada tipo de dato)en configuración se modificaran idioma, tema ...etc.
                { labelName: "Configuration", icon: <FaCog />, component: <ComponentConfiguration user={user} setIsEditing={(value:string) => setModalState(value)} /> }
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

const ComponentConfiguration = ({ user, setIsEditing }: { user: InterfaceUser; setIsEditing: (value:string) => void }) => {

    return (
        <div className="flex flex-col w-full h-auto px-20 py-4 gap-4">

            <ConfigurationListItem label="Username" value={user.name} setIsEditing={() => setIsEditing('name')} />
            <ConfigurationListItem label="Email" value={user.email} setIsEditing={() => setIsEditing('email')} />
            <ConfigurationListItem label="Password" value="********" setIsEditing={() => setIsEditing('password')} />
            <ConfigurationListItem label="Role" value={user.role} setIsEditing={() => setIsEditing('role')} />
        </div>
    )
}
const ConfigurationListItem = ({ label, value, setIsEditing }: { label: string; value: string; setIsEditing: () => void }) => {

    return (
        <>


            <div className="flex items-center justify-between gap-4 p-4 mx-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-4">
                    <label className="block text-base font-semibold text-gray-700 w-24">{label}</label>
                    <span className="text-gray-600 text-base">{value}</span>
                </div>
                <a href="#" className="text-blue-500 hover:text-blue-700" onClick={() => setIsEditing()}>
                    edit
                </a>
            </div>
        </>
    )
}