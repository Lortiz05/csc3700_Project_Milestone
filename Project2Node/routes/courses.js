// routes/courses.js
// All five CRUD routes plus search -- mysql2 with parameterized queries
const express = require('express')
const router = express.Router()
const pool = require('../util/database')
const validateCourse = require('../util/validateCourse')
const {getCoursesWithPrereqs} = require('../util/courseData')

// GET all courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await getCoursesWithPrereqs(pool)
        res.json(courses)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// GET search by title -- must come BEFORE /books/:id
router.get('/courses/search/:term', async (req, res) => {
    try {
        const course = await getCoursesWithPrereqs(pool)
        res.json(course)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// GET single course by id
router.get('/courses/:id', async (req, res) => {
    try {
        const course = await getCoursesWithPrereqs(pool, req.params.id)
        if (!course) {
            return res.status(404).json({error: 'Course not found'})
        }
        res.json(course)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// POST -- create a new course
router.post('/courses', async (req, res) => {
    const error = validateCourse(req.body)
    if (error) return res.status(400).json({error})

    const {title, number, description, credits, prerequisites} = req.body
    try {
        const [result] = await pool.query(
            'INSERT INTO courses (title, number, description, credits) VALUES (?, ?, ?, ?)',
            [title, number, description, Number(credits) || 0]
        )
        for (const prereqId of prerequisites) {
            await pool.query(
                'INSERT INTO prerequisites (course_id, prereq_id) VALUES (?, ?)',
                [result.insertId, prereqId]
            )

        }
        const newCourse = await getCoursesWithPrereqs(pool, result.insertId)
        res.status(201).json(newCourse)

    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// PUT -- change/update an existing course
router.put('/courses/:id', async (req, res) => {
    const error = validateCourse(req.body)
    if (error) return res.status(400).json({error})

    const {title, number, description, credits, prerequisites} = req.body
    const id = parseInt(req.params.id)

    try {
        // This already does the check instead of using an 'if' from our expected format in class.
        const existingCourse = await getCoursesWithPrereqs(pool, id)
        if (!existingCourse) {
            return res.status(404).json({error: 'Course not found'})
        }

        await pool.query(
            'UPDATE courses SET title = ?, number =?, description = ?, credits =? WHERE id = ?',
            [title, number, description, Number(credits), id]
        )
        await pool.query(
            'DELETE FROM prerequisites WHERE course_id = ?',
            [id]
        )
        for (const prereqId of prerequisites) {
            await pool.query(
                'INSERT INTO prerequisites (course_id, prereq_id) VALUES (?,?)',
                [id, prereqId]
            )
        }
        const updatedCourse = await getCoursesWithPrereqs(pool, id)
        res.status(200).json(updatedCourse)

    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// DELETE -- remove a course
router.delete('/courses/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const course = await getCoursesWithPrereqs(pool,id)
        if (!course) return res.status(404).json({error: 'Course not found'})
        await pool.query('DELETE FROM courses WHERE id = ?', [id])
        res.json(course)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

module.exports = router
