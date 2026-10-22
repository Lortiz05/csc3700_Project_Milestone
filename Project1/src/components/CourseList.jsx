function CourseList({ courses = [], completed = [], onToggle }) {

    // Look up course numbers using prerequisite IDs
    function getPrerequisiteNumbers(prerequisites = []) {
        if (prerequisites.length === 0) {
            return 'None';
        }

        return prerequisites.map((id) => {
            const prerequisiteCourse = courses.find(
                (item) => String(item.id) === String(id)
            );

            return prerequisiteCourse
                ? prerequisiteCourse.number
                : `Unknown (${id})`;
        }).join(', ');
    }

    return (
        <div>
            <h2 className="mb-3">Computer Science Course Catalog</h2>

            {courses.length === 0 ? (
                <p>No courses were found.</p>
            ) : (
                <div className="row">
                    {courses.map((course) => {
                        const isCompleted = completed.some(
                            id => String(id) === String(course.id)
                        );

                        const prerequisitesMet = course.prerequisites.every(
                            prerequisiteId =>
                                completed.some(
                                    id => String(id) === String(prerequisiteId)
                                )
                        );

                        const isLocked = !isCompleted && !prerequisitesMet;

                        return (
                            <div
                                className="col-md-6 mb-4"
                                key={course.id}
                            >
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
                                            {getPrerequisiteNumbers(
                                                course.prerequisites
                                            )}
                                        </p>

                                        <div className="form-check">
                                            <input
                                                className="form-check-input course-checkbox"
                                                type="checkbox"
                                                id={`course-${course.id}`}
                                                checked={isCompleted}
                                                onChange={() => onToggle(course.id)}
                                                disabled={isLocked}
                                            />

                                            <label
                                                className="form-check-label"
                                                htmlFor={`course-${course.id}`}
                                            >
                                                Completed
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default CourseList;