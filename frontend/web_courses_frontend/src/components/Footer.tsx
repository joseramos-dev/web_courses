const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t border-white mt-10">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

                {/* Left */}
                <div className="text-gray-400 text-sm hover:text-green-400">
                    © {new Date().getFullYear()} CourseApp
                </div>

                {/* Center */}
                <div className="flex gap-6 text-sm text-gray-400">
                    <a href="/Courses" className="hover:text-green-400">Courses</a>
                    <a href="/Profile" className="hover:text-green-400">Profile</a>
                </div>

                {/* Right */}
                <div className="text-sm text-gray-400 hover:text-green-400">
                    Built with React + Tailwind
                </div>

            </div>
        </footer>
    )
}

export default Footer