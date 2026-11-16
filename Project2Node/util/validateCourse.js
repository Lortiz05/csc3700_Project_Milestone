// util/validateCourse.js
// Shared validation for POST and PUT -- returns an error string or null
function validateCourse(body) {
    const { title, number, credits, prerequisites } = body

    if (!title || !number||credits===undefined||credits===null||credits==='') {
        return 'title, number, and credits are required'
    }

    if (!Number.isInteger(Number(credits))||Number(credits)<0) {
        return 'credits must be a non-negative and a whole number'
    }
    if(!Array.isArray(prerequisites)){
        return 'prerequisites must be an array'
    }
    if (!prerequisites.every(id=>Number.isInteger(Number(id))&& Number(id)>0)){
        return 'each prerequisite must be a valid course ID'
    }
    return null   // null means valid
}

module.exports = validateCourse
