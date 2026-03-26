
import { Link } from "react-router-dom";
import { FaGraduationCap, FaUser } from "react-icons/fa";

function ComponentNavBar() {

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <FaGraduationCap className="text-green-600 text-3xl" />
        <Link to="/" className="text-2xl font-bold text-gray-800 tracking-tight">
          WebCourses
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <Link to="/Profile"  className="text-gray-600 hover:text-green-600 font-medium transition-colors">
          Courses
        </Link>
        <Link to="/Profile" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
          Dashboard
        </Link>
        <Link
          to="/Profile"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-all shadow-sm"
        >
          <FaUser size={14} />
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  );
}

export default ComponentNavBar;