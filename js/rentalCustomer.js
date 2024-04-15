document.addEventListener('DOMContentLoaded', function () {
    const reservationForm = document.getElementById('reservationForm');
    reservationForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent form submission

        // Extract form data
        const customerName = document.getElementById('customerName').value;
        const customerEmail = document.getElementById('customerEmail').value;
        const customerAddress = document.getElementById('customerAddress').value;
        const pickupDate = document.getElementById('pickupDate').value;
        const dropoffDate = document.getElementById('dropoffDate').value;

        // Extract licensePlate from URL parameters
        const queryParams = getQueryParams();
        const licensePlate = queryParams.licensePlate;

        // Construct request body
        const requestData = {
            customerName,
            customerEmail,
            customerAddress,
            pickupDate,
            dropoffDate,
            licensePlate // Include license plate in the request data
        };

        try {
            // Send reservation data to server
            const response = await fetch('http://localhost:3000/reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit reservation');
            }

            // Redirect to inventory.html after successful reservation submission
            window.location.href = 'inventoryCustomer.html';
        } catch (error) {
            console.error('Error submitting reservation:', error);
            alert('Failed to submit reservation. Please try again later.');
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

