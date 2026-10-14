
function CourseList({ courses = [] }) {
    // Look up a course by its ID so we can display its course number
    const getPrerequisiteNumbers = (prerequisites) => {
        if (!prerequisites || prerequisites.length === 0) {
            return 'None';
        }

        return prerequisites
            .map((id) => {
                const course = courses.find((item) => item.id === id);
                return course ? course.number : `Unknown (${id})`;
            })
            .join(', ');
    };

    return (
        <div>
            <h2 className="mb-3">Computer Science Course Catalog</h2>

            {courses.length === 0 ? (
                <p>No courses were found.</p>
            ) : (
                <div className="row">
                    {courses.map((course) => (
                        <div className="col-md-6 mb-4" key={course.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {course.number}: {course.title}
                                    </h5>

                                    <p className="card-text">
                                        <strong>Credits:</strong> {course.credits}
                                    </p>

                                    <p className="card-text">
                                        {course.description}
                                    </p>

                                    <p className="card-text">
                                        <strong>Prerequisites:</strong>{' '}
                                        {getPrerequisiteNumbers(course.prerequisites)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CourseList;