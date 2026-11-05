// util/validateCourse.js
// Shared validation for POST and PUT -- returns an error string or null
function validateCourse(body) {
    const { title,id, number, description, credits } = body

    if (!title || !description|| !number) {
        return 'title, description, and number are required'
    }
    if(!id||isNaN(parseInt(id))){
        return 'id must be a whole number'
    }

    if (parseInt(credits) < 0 || parseInt(credits) > 5) {
        return 'year must be between 0 and 5'
    }
    return null   // null means valid
}

module.exports = validateCourse
