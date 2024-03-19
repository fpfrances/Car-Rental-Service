// Function to toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('customerPassword');
    passwordInput.type = (passwordInput.type === 'password') ? 'text' : 'password';
}

document.addEventListener('DOMContentLoaded', function () {
    const reservationForm = document.getElementById('newUserForm');
    reservationForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Extract form data
    const userName = document.getElementById('customerFullname').value;
    const userEmail = document.getElementById('customerEmail').value;
    const userAddress = document.getElementById('customerAddress').value;
    const userPhone = document.getElementById('customerPhone').value;
    const userPassword = document.getElementById('customerPassword').value;

    // Hash the password
    const userPasswordHashed = await sha256(userPassword);

    // Construct request body
    const requestData = {
        userName,
        userEmail,
        userAddress,
        userPhone,
        userPassword: userPasswordHashed,
    };

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            // Account creation success
            alert('Account created successfully!');
            window.location.href = '../pages/account.html'; // Redirect to a new page
        } else {
            // Account creation failed
            alert('Error: Account creation failed.');
        }
    } catch (error) {
        // Error in fetch or processing response
        console.error('Error:', error);
        alert('Error: Account creation failed.');
    }
});

// Phone input restrictions
document.getElementById('customerPhone').addEventListener('input', function(event) {
    const input = event.target;
    const inputValue = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    // Format the phone number
    let formattedNumber = '(' + inputValue.substring(0, 3);
    if (inputValue.length > 3) {
        formattedNumber += ') ' + inputValue.substring(3, 6);
    }
    if (inputValue.length > 6) {
        formattedNumber += '-' + inputValue.substring(6, 10);
    }
    input.value = formattedNumber;
});

// Email input restrictions
document.getElementById('customerEmail').addEventListener('input', function(event) {
    const input = event.target;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for basic email validation

    if (!emailPattern.test(input.value)) {
        input.setCustomValidity('Please enter a valid email address.');
    } else {
        input.setCustomValidity('');
    }
    });
});

// Function to hash password using SHA-256
async function sha256(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}