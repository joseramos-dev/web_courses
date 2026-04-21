// Enums

export type SiteEnum =
    | "Coursera"
    | "Future Learn"
    | "Udacity"
    | "Simplilearn";

export type CategoryEnum =
    | "Non defined"
    | "business"
    | "computer science"
    | "data science"
    | "health"
    | "information technology"
    | "physical science and engineering"
    | "arts and humanities"
    | "language learning"
    | "social sciences"
    | "personal development"
    | "math and logic";

// Interface

export interface InterfaceCourse {
    id: number;
    title: string;
    url: string;
    site: SiteEnum;
    category: CategoryEnum;
    language: string;
    course_type: string;
    subcategory: string;
    intro: string;
    duration_seconds: number;
    rating: number;
}

export interface InterfaceQueryCourses {
    courses: InterfaceCourse[];
    total: number;
}