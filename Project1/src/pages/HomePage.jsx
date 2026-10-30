
import useFetch from '../hooks/useFetch';
import CourseList from '../components/CourseList.jsx';
import {useEffect, useState} from "react";
import ProgressSummary from "../components/ProgressSummary.jsx";

function HomePage() {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Fetch the course data from JSON Server
    const { data, isPending, error } = useFetch(
        `${BASE_URL}/courses`
    );

    // Wait for the data before passing it to CourseList
    const courses = Array.isArray(data) ? data : [];
    const [completed, setIsCompleted] = useState([]);
    useEffect(() => {
        const savedProgress = localStorage.getItem('completedCourses');

        if (savedProgress) {
            setIsCompleted(JSON.parse(savedProgress));
        }
    },[]);

    const toggleCourse = (courseId) => {
        const course = courses.find(
            item => String(item.id) === String(courseId)
        );

        if (!course) return;

        setIsCompleted(prev => {
            // Check whether this course is already completed
            const isAlreadyCompleted = prev.some(
                id => String(id) === String(courseId)
            );

            // If completed, uncheck it and all dependent courses
            if (isAlreadyCompleted) {
                const idsToRemove = new Set([String(courseId)]);

                let changed = true;

                while (changed) {
                    changed = false;

                    courses.forEach(item => {
                        const dependsOnRemovedCourse =
                            (item.prerequisites || []).some(
                                id => idsToRemove.has(String(id))
                            );

                        if (
                            dependsOnRemovedCourse &&
                            !idsToRemove.has(String(item.id))
                        ) {
                            idsToRemove.add(String(item.id));
                            changed = true;
                        }
                    });
                }

                return prev.filter(
                    id => !idsToRemove.has(String(id))
                );
            }

            // Check that all prerequisites are completed
            const prerequisitesMet =
                (course.prerequisites || []).every(
                    prerequisiteId =>
                        prev.some(
                            id => String(id) === String(prerequisiteId)
                        )
                );

            // Don't complete a locked course
            if (!prerequisitesMet) return prev;

            return [...prev, course.id];
        });
    };


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
                <ProgressSummary courses={courses} completed={completed}/>
            )}

            {!isPending && !error && (
                <CourseList courses={courses}
                            completed={completed}
                            onToggle={toggleCourse} />
            )}
        </div>
    );
}

export default HomePage;
