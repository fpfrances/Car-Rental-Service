// Function to toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('customerPassword');
    passwordInput.type = (passwordInput.type === 'password') ? 'text' : 'password';
}

document.addEventListener('DOMContentLoaded', function () {
    const accountForm = document.getElementById('accountForm');
    accountForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent form submission

        // Extract form data
        const userEmail = document.getElementById('customerEmail').value;
        const userPassword = document.getElementById('customerPassword').value;

        // Construct request body
        const formData = {
            userEmail,
            userPassword
        };

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                // Authentication successful
                const responseData = await response.json();
                alert(responseData.message); // Display success message
                // Redirect user
                window.location.href = responseData.redirect;
            } else {
                // Authentication failed
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