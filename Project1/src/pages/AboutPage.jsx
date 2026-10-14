
function AboutPage() {
    // This creates a JavaScript Date object representing the current date and time on the user's device.
    // For example, it might represent October 13, 2026, at 9:30 AM.
    // At this point, the result is a date object, not just a formatted text string.
    //THEN ".toLocaleDateString()" converts it into readable string.
    //Fancy terms: This method converts the date object into a readable date string using the device's default locale settings.
    const today = new Date().toLocaleDateString();

    return (

        <div className=" card h-100 container mt-4">
            <h2>About Aurora CS Course Scheduler</h2>

            <p>
                <strong>Author(s)</strong> Lesly Ortiz and Justin Wedeen
            </p>

            <p>
                <strong>Date:</strong> {today}
            </p>

            <p>
                <strong>Application Version:</strong> 1.0.0
            </p>
        </div>
    );
}

export default AboutPage;