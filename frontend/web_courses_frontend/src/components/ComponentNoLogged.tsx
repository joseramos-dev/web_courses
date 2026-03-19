

const ComponentNoLogged = () => {
    return (
        <div className="min-h-screen bg-green-900 flex items-center justify-center p-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-600 mb-4">No estás logueado. Por favor, inicia sesión para acceder a tu perfil.</p>
                <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Iniciar Sesión</a>
            </div>
        </div>
    )
}

export default ComponentNoLogged;