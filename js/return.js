document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent form submission

        // Extract form data
        const customerName = document.getElementById('searchCustomerName').value;
        const customerEmail = document.getElementById('searchCustomerEmail').value;

        // Construct request body
        const formData = {
            customerName,
            customerEmail
        };

        try {
            const response = await fetch('http://localhost:3001/return', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                // Vehicle returned successfully
                const responseData = await response.json();
                alert(responseData.message); // Display success message
                // redirect to Fines page
                window.location.href = '../pages/fines.html'
            } else {
                // Error returning vehicle
                const errorText = await response.text();
                alert(errorText); // Display error message returned from the server
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle other errors
            alert('An error occurred. Please try again later.');
        }
    });
});
