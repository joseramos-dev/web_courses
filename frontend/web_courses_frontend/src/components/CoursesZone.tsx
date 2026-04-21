import type { InterfaceCourse } from "../Interfaces/InterfaceCourse"

interface CoursesZoneProps {
    courses: InterfaceCourse[]
}

const CoursesZone = ({ courses }: CoursesZoneProps) => {
    if (!courses.length) {
        return (
            <div className="w-full p-8 text-center text-gray-600">
                No se encontraron cursos.
            </div>
        )
    }

    return (
        <div className="flex flex-wrap gap-4 justify-center p-4">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    )
}

const CourseCard = ({ course }: { course: InterfaceCourse }) => {
    return (
        <div className="w-full max-w-sm min-h-80 flex flex-col rounded-xl border border-gray-200 p-6 shadow-sm bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {course.title}
            </h2>

            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {course.intro}
            </p>

            <p className="text-sm text-gray-500 mb-3">
                {course.site} · {course.category}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                <CourseRating rating={course.rating} />
                <span className="text-xs px-2 py-1 rounded-md border border-gray-200">
                    {Math.ceil(course.duration_seconds / 3600)} horas
                </span>
                <span className="text-xs px-2 py-1 rounded-md border border-gray-200">
                    {course.language}
                </span>
            </div>

            <a
                href={course.url}
                target="_blank"
                rel="noreferrer"
                className="mt-auto w-full inline-block text-center border border-green-400 text-green-600 py-2 rounded-lg hover:bg-green-50 transition"
            >
                Ver curso
            </a>
        </div>
    )
}

const CourseRating = ({ rating }: { rating: number }) => {
    return (
        <span className="text-xs px-2 py-1 rounded-md border border-gray-200">
            ⭐ {rating.toFixed(1)}
        </span>
    )
}

export default CoursesZone