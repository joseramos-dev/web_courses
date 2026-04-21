const MAX_PAGES_TAGS = 10

const CoursesPagesChanger = (
    { currentPage, totalPages, onPageChange }:
        { currentPage: number, totalPages: number, onPageChange: (page: number) => void }
) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
            {/* Botón anterior */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-400 rounded disabled:opacity-50 disabled:hover:border-gray-400 hover:border-green-400"
            >
                {"< Prev"}
            </button>

            {/* Números de página */}
            {
                pages.length < MAX_PAGES_TAGS ?
                    <TagPageNumber pages={pages} currentPage={currentPage} onPageChange={(e) => onPageChange(e)} />
                    :
                    <TagPageTooMuchNumber pages={pages} currentPage={currentPage} onPageChange={(e) => onPageChange(e)} />
            }

            {/* Botón siguiente */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-3 py-1 border border-gray-400 rounded disabled:opacity-50 disabled:hover:border-gray-400 hover:border-green-400"
            >
                {"Next >"}
            </button>
        </div>
    );
};

const TagPageNumber = (
    { pages, currentPage, onPageChange }:
        { pages: number[], currentPage: number, onPageChange: (page: number) => void }
) => {
    return (
        <>
            {pages.map((page) => (
                <TagButton page={page} currentPage={currentPage} onPageChange={(e) => onPageChange(e)} />
            ))}
        </>
    )
}

const TagPageTooMuchNumber = (
    { pages, currentPage, onPageChange }:
        { pages: number[], currentPage: number, onPageChange: (page: number) => void }
) => {
    const closeLeft: boolean = ( (currentPage) - (Math.round(MAX_PAGES_TAGS / 2)+1) < 0) ? true : false
    const closeRight: boolean = (currentPage + Math.round(MAX_PAGES_TAGS / 2) >= pages.length) ? true : false

    return (
        <>
            {closeLeft ? (
                <TagTooMuchLeft pages={pages} currentPage={currentPage} onPageChange={onPageChange} />
            ) : closeRight ? (
                <TagTooMuchRight pages={pages} currentPage={currentPage} onPageChange={onPageChange} />
            ) : (
                <TagTooMiddle pages={pages} currentPage={currentPage} onPageChange={onPageChange} />
            )}
        </>
    )
}

const TagTooMuchLeft = (
    { pages, currentPage, onPageChange }:
        { pages: number[], currentPage: number, onPageChange: (page: number) => void }
) => {
    return (
        <>
            {pages.slice(0, MAX_PAGES_TAGS - 1).map((page) => (
                <TagButton page={page} currentPage={currentPage} onPageChange={(e) => onPageChange(e)} />
            ))}
            <TagEllipsis />
            <TagButton page={pages[pages.length - 1]} currentPage={currentPage} onPageChange={(e) => onPageChange(e)} />
        </>
    )
}
const TagTooMuchRight = (
    { pages, currentPage, onPageChange }:
        { pages: number[], currentPage: number, onPageChange: (page: number) => void }
) => {
    const lastIndex = pages.length
    return (
        <>
            <TagButton page={pages[0]} currentPage={currentPage} onPageChange={(e) => onPageChange(e)} />
            <TagEllipsis />
            {pages.slice(lastIndex - MAX_PAGES_TAGS, lastIndex ).map((page) => (
                <TagButton page={page} currentPage={currentPage} onPageChange={(e) => onPageChange(e)} />
            ))}
        </>
    )
}
const TagTooMiddle = (
    { pages, currentPage, onPageChange }:
        { pages: number[], currentPage: number, onPageChange: (page: number) => void }
) => {
    const half_max = Math.round(MAX_PAGES_TAGS / 2)-1
    return (
        <>
            <TagButton page={pages[0]} currentPage={currentPage} onPageChange={(e) => onPageChange(e)} />
            <TagEllipsis />
            {pages.slice(currentPage - half_max, currentPage + half_max).map((page) => (
                <TagButton page={page} currentPage={currentPage} onPageChange={(e) => onPageChange(e)} />
            ))}
            <TagEllipsis />
            <TagButton page={pages[pages.length - 1]} currentPage={currentPage} onPageChange={(e) => onPageChange(e)} />
        </>
    )
}

const TagButton = (
    { page, currentPage, onPageChange }
        : { page: number, currentPage: number, onPageChange: (page: number) => void }
) => {
    return (
        <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border border-gray-300 rounded hover:border-green-400 ${page === currentPage ? "bg-green-500 text-white" : "bg-white"}`}>
            {page}
        </button>
    )
}
const TagEllipsis = () => {
    return (
        <button
            className={`px-3 py-1 border border-gray-300 rounded bg-white`}>
            ...
        </button>
    )
}

export default CoursesPagesChanger