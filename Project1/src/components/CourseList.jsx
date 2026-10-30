import {useState} from 'react';

function CourseList({courses = [], completed = [], onToggle}) {

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
    const [saveMessage, setSaveMessage] = useState('');
    const categories = ['All Courses', 'Completed Only', 'Remaining']
    const filteredCourses = activeFilter === 'All Courses'
        ? courses
        : activeFilter === 'Completed Only' ? courses.filter(course => completed.includes(String(course.id))) : courses.filter(course => !completed.includes(String(course.id)));

    const saveProgress = () => {
        localStorage.setItem('completedCourses', JSON.stringify(completed));
        setSaveMessage('Progress saved.')
    }
    return (

        <div>
            <div className='containB'>
                {categories.map(category => (
                    <button key={category} onClick={() => setActiveFilter(category)}
                            className='btn'
                            style={{
                                cursor: 'pointer',
                                backgroundColor: activeFilter === category ? '#0070f3' : '#f0f0f0',
                                color: activeFilter === category ? '#fff' : '#000',
                                fontWeight: activeFilter === category ? 'bold' : 'normal'
                            }}>{category}</button>
                ))}
                <div style={{marginLeft: 'auto'}}>
                    {saveMessage && (
                        <text className="text-success mt-2">
                            {saveMessage}
                        </text>
                    )}
                </div>

                <button className='btn btn-success' style={{marginLeft: 'auto'}}
                        onClick={() => saveProgress()}
                >Save
                </button>

            </div>

            {filteredCourses.length === 0 ? (
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

                                <div className="card h-100 border-3"
                                     style={{
                                         borderColor: isLocked ? 'darkgrey' : isCompleted ? "green" : isAvailable?"#2871D7": "white",
                                         backgroundColor: isLocked?'lightgray': isCompleted? "#EBFBE9":"white"
                                }}>
                                    <div className='card-header d-flex justify-content-between align-items-center'>
                                        <h5 className="card-title text-start">
                                            {course.number}
                                        </h5>
                                        <span className={`badge ${isCompleted ? 'bg-success' : isAvailable
                                            ? 'bg-primary'
                                            : 'bg-secondary'
                                        }`}>
                                            {
                                                isCompleted ? '✅Completed' :
                                                    isAvailable ? 'Available' :
                                                        '🔒Locked'
                                            }
                                        </span>
                                    </div>

                                    <div className="card-body text-start">

                                        <h4>{course.title}</h4>
                                        <p className="card-text text-body-secondary">
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