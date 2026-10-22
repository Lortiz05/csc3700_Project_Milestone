function ProgressSummary({ courses = [], completed = [] }) {
    const completedCount = courses.filter(
        course => completed.includes(course.id)
    ).length;
    const availableCount = courses.filter(
        course =>
            !completed.includes(course.id) &&
            course.prerequisites.every(
                id => completed.includes(id)
            )
    ).length;

    const lockedCount = courses.filter(
        course =>
            !completed.includes(course.id) &&
            !course.prerequisites.every(
                id => completed.includes(id)
            )
    ).length;

    const percentage = courses.length
        ? (completedCount / courses.length) * 100
        : 0;
    return (
        <div className="card mb-4">
            <div className="card-body">
                {/*<h4>Progress Summary</h4>*/}

                <div className="d-flex justify-content-between">
                    <span className="text-success">
                        Completed: {completedCount} of {courses.length} courses completed
                    </span>

                    <span className="text-primary">
                        Available: {availableCount}
                    </span>

                    <span className="text-secondary">
                        Locked: {lockedCount}
                    </span>
                </div>
                <div className="progress">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${percentage}%` }}
                        aria-valuenow={percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        {Math.round(percentage)}%
                    </div>
                </div>

            </div>
        </div>
    );

}

export default ProgressSummary;