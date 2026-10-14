
import useFetch from '../hooks/useFetch';
import CourseList from '../components/CourseList.jsx';

function HomePage() {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Fetch the course data from JSON Server
    const { data, isPending, error } = useFetch(
        `${BASE_URL}/courses`
    );

    // Wait for the data before passing it to CourseList
    const courses = Array.isArray(data) ? data : [];

    return (
        <div>
            {isPending && (
                <div className="text-muted">Loading courses...</div>
            )}

            {error && (
                <div className="text-danger">
                    Error loading courses: {String(error)}
                </div>
            )}

            {!isPending && !error && (
                <CourseList courses={courses} />
            )}
        </div>
    );
}

export default HomePage;
