import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function CourseCard() {
    const { id } = useParams();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const url = `${BASE_URL}/courses/${id}`;

    const { data, error, isPending } = useFetch(url);

    const course = data && !Array.isArray(data) ? data : null;

    return (
        <div className="container mt-4">
            <h2>Course Details</h2>

            {isPending && (
                <p className="text-muted">Loading course details...</p>
            )}

            {error && (
                <p className="text-danger">
                    Error loading course: {String(error)}
                </p>
            )}

            {course && (
                <div className="card mt-3">
                    <div className="card-body">
                        <h3 className="card-title">
                            {course.number}: {course.title}
                        </h3>

                        <p>
                            <strong>Credits:</strong> {course.credits}
                        </p>

                        <p>
                            <strong>Description:</strong> {course.description}
                        </p>

                        <p>
                            <strong>Prerequisites:</strong>{' '}
                            {course.prerequisites?.length
                                ? course.prerequisites.join(', ')
                                : 'None'}
                        </p>
                    </div>
                </div>
            )}

            {!isPending && !error && !course && (
                <p className="text-muted">Course not found.</p>
            )}

            <Link to="/" className="btn btn-primary mt-3">
                Back to Courses
            </Link>
        </div>
    );
}

export default CourseCard;