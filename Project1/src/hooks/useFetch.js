// src/hooks/useFetch.js
import { useState, useEffect } from 'react'

// useFetch is a custom hook — a plain function starting with 'use'
// url is the API endpoint to fetch from
// Every time url changes useFetch runs the fetch again
function useFetch(url) {

    // data holds whatever the API returned — could be array or single object
    // starts as null — nothing has arrived yet
    const [data, setData] = useState(null)

    // isPending starts true — fetch is in progress from the moment hook runs
    // set to false when fetch completes successfully or with an error
    const [isPending, setIsPending] = useState(true)

    // error starts null — no error yet
    // set to an error message string if the fetch fails
    const [error, setError] = useState(null)

    // url is in the dependency array
    // useEffect runs again whenever url changes
    // This means BookDetails automatically refetches when the user
    // navigates from /bookdetails/1 to /bookdetails/3
    useEffect(() => {
        setTimeout(() => {
        fetch(url)
            .then(resp => {
                // Check HTTP status — 404 and 500 do not throw automatically
                // resp.ok is true for 200-299 status codes
                if (!resp.ok) {
                    console.log( `Bad Response res:${resp.status}`)
                    throw new Error(`HTTP error: ${resp.status}`)
                }
                return resp.json()
            })
            .then(data => {
                setData(data)
                setIsPending(false)
                setError(null)
            })
            .catch(err => {
                console.log( `Catch Happened error:${err.message}`)
                // .catch() handles both network errors and the thrown HTTP errors
                setError(err.message)
                setIsPending(false)
            })
        }, 2000);
    }, [url])


    // Return all three values as an object
    // Calling component destructures what it needs
    return { data, isPending, error }
}

export default useFetch
