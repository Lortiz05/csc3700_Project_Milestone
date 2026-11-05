// routes/courses.js
// All five CRUD routes plus search -- mysql2 with parameterized queries
const express = require('express')
const router = express.Router()
const pool = require('../util/database')
const validateCourse = require('../util/validateCourse')

// GET all courses
router.get('/courses', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM courses')
        res.json(rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET search by title -- must come BEFORE /books/:id
router.get('/courses/search/:term', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM courses WHERE title LIKE ?',
            [`%${req.params.term}%`]
        )
        res.json(rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// GET single course by id
router.get('/courses/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM courses WHERE id = ?',
            [req.params.id]
        )
        if (rows.length === 0) return res.status(404).json({ error: 'Course not found' })
        res.json(rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// POST -- create a new book
router.post('/courses', async (req, res) => {
    const error = validateCourse(req.body)
    if (error) return res.status(400).json({ error })

    const { title, pages, author, year, num_sold } = req.body
    try {
        const [result] = await pool.query(
            'INSERT INTO courses (title, number, description, credits) VALUES (?, ?, ?, ?, ?)',
            [title, parseInt(credits), author, parseInt(year), num_sold || 0]
        )
        const [rows] = await pool.query(
            'SELECT * FROM courses WHERE id = ?', [result.insertId]
        )
        res.status(201).json(rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// PUT -- update an existing book
router.put('/courses/:id', async (req, res) => {
    const error = validateCourse(req.body)
    if (error) return res.status(400).json({ error })

    const { title, pages, author, year, num_sold } = req.body
    const id = parseInt(req.params.id)
    try {
        const [result] = await pool.query(
            'UPDATE books SET title=?, pages=?, author=?, year=?, num_sold=? WHERE id=?',
            [title, parseInt(pages), author, parseInt(year), parseInt(num_sold), id]
        )
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Course not found' })
        const [rows] = await pool.query(
            'SELECT * FROM books WHERE id = ?', [id]
        )
        res.json(rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// DELETE -- remove a book
router.delete('/books/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const [rows] = await pool.query(
            'SELECT * FROM books WHERE id = ?', [id]
        )
        if (rows.length === 0) return res.status(404).json({ error: 'Course not found' })
        await pool.query('DELETE FROM books WHERE id = ?', [id])
        res.json(rows[0])
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router
