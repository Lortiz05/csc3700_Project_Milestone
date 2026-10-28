import {useState} from 'react';

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

    const [activeFilter, setActiveFilter] = useState('All Courses');
    const categories = ['All Courses', 'Completed Only', 'Remaining']
    const filteredCourses = activeFilter === 'All Courses'
        ? courses
        : activeFilter === 'Completed Only' ? courses.filter(course => completed.includes(String(course.id))) : courses.filter(course => !completed.includes(String(course.id)));

    return (

        <div>
            <h2 className="mb-3">Computer Science Course Catalog</h2>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                {categories.map(category =>(
                    <button key={category} onClick={() => setActiveFilter(category)} style={{
                        padding: '8px 16px',
                        cursor: 'pointer',
                        backgroundColor: activeFilter === category ? '#0070f3' : '#f0f0f0',
                        color: activeFilter === category ? '#fff' : '#000',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontWeight: activeFilter === category ? 'bold' : 'normal'
                    }}>{category}</button>
                ))}
            </div>
            {courses.length === 0 ? (
                <p>No courses were found.</p>
            ) : (

                <div className="row">
                    {filteredCourses.map((course) => {
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
                        const isAvailable = !isCompleted && prerequisitesMet;


                        return (



                            <div
                                className="col-md-6 mb-4"
                                key={course.id}
                            >

                                <div className="card h-100" style={{backgroundColor: isLocked ? 'lightgrey' : isCompleted ? "lightgreen" : "white"}}>
                                    <div className='card-header'>
                                        <h5 className="card-title">
                                        {course.number}: {course.title}
                                    </h5>
                                        <span className={`badge ${isCompleted? 'bg-success-subtle': isAvailable
                                            ? 'bg-primary'
                                            : 'bg-secondary'
                                        }`}>
                                            {
                                                isCompleted? 'Completed':
                                                    isAvailable? 'Available':
                                                        'Locked'
                                            }

                                        </span>
                                    </div>

                                    <div className="card-body">


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
                                        </div>
                                    <div className='card-footer text-body-secondary'>
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
                                                {isCompleted ? "Completed" : isLocked ? "Locked" : "Incomplete"}
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