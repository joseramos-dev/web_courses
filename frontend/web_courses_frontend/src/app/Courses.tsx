import { useEffect, useRef, useState } from "react"
import CoursesPagesChanger from "../components/CoursesPagesChanger"
import CoursesZone from "../components/CoursesZone"
import { FaSearch } from "react-icons/fa"
import type { InterfaceCourse } from "../Interfaces/InterfaceCourse"
import { getCourses } from "../services/CoursesServices"


const PAGE_SIZE = 20

export const Courses = () => {
    const [currentPage, setCurrentpage] = useState<number>(1)
    const [query, setQuery] = useState<string>("")
    const [courses, setCourses] = useState<InterfaceCourse[]>([])
    const totalCourses = useRef(0)

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const skip = (currentPage - 1) * PAGE_SIZE
                const response = await getCourses(skip, PAGE_SIZE, query)
                setCourses(response.courses)
                totalCourses.current = response.total
                console.log("Total de cursos: ", totalCourses.current)
                console.log("total pages: ", calculateTotalPages(totalCourses.current))
            } catch (error) {
                console.error("Error cargando cursos:", error)
            }
        }

        loadCourses()
    }, [currentPage, query])

    return (
        <div className="flex-hor">
            <CoursesFilter onSearch={(value) => {
                setCurrentpage(1)
                setQuery(value)
            }} />
            <CoursesZone courses={courses} />
            <CoursesPagesChanger
                currentPage={currentPage}
                totalPages={calculateTotalPages(totalCourses.current)}
                onPageChange={(p) => setCurrentpage(p)}
            />
        </div>

    )
}

const calculateTotalPages = (totalCourses: number): number => {
    return totalCourses % PAGE_SIZE === 0 ? totalCourses / PAGE_SIZE : Math.floor(totalCourses / PAGE_SIZE) + 1
}

const CoursesFilter = ({ onSearch }: { onSearch: (value: string) => void }) => {
    return (
        <div className="flex justify-center p-4">
            <SearchBar onSearch={onSearch} />
        </div>
    )
}

const SearchBar = (
    { onSearch }: { onSearch: (value: string) => void }
) => {
    const [query, setQuery] = useState("")

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch?.(query)
    }

    return (
        <form onSubmit={handleSearch} className="w-full py-4">
            <div className="w-full max-w-4xl mx-auto relative">

                <button
                    type="submit"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-500"
                >
                    <FaSearch />
                </button>

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 
                    focus:outline-none focus:ring-2 focus:ring-green-400 
                    focus:border-transparent"
                />
            </div>
        </form>
    )
}





export default Courses