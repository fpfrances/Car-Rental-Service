document.addEventListener('DOMContentLoaded', function () {
    const maintenanceReportForm = document.getElementById('maintenanceReportForm');
    maintenanceReportForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        // Extract licensePlate from URL
        const params = getQueryParams();
        const licensePlate = params.licensePlate;

        // Form data
        const expectedReturnDate = document.getElementById('returnDate').value;
        const details = document.getElementById('details').value;

        const requestData = {
            expectedReturnDate,
            details,
            licensePlate
        };

        try {
            // Send the maintenance details to the server so a new maintenance object can be added to the database
            const response = await fetch('http://localhost:3000/maintenanceReportSubmission', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit maintenance report');
            }

            const responseData = await response.json();
            alert(responseData.message);
            maintenanceReportForm.reset();
            
            // Redirect to inventoryStaff.html after successful submission
            window.location.href = 'inventoryStaff.html';
        } catch (error) {
            console.error('Error submitting maintenance report:', error);
            alert('Failed to submit maintenance report. Please try again later.');
        }
    });

});


// Function to extract query parameters from URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    for (const [key, value] of urlParams) {
        params[key] = value;
    }
    return params;
}
