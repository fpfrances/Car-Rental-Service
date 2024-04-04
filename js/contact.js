// Function to open modal
function openModal() {
    var modal = document.getElementById("returnMessage");
    modal.style.display = "block";
}

// Function to handle form submission
function submitForm() {
    // Check if all form fields are filled
    var name = document.getElementById("nameId").value.trim();
    var email = document.getElementById("emailId").value.trim();
    var phone = document.getElementById("phoneId").value.trim();
    var message = document.getElementById("returnCondition").value.trim();

    if (name === '' || email === '' || phone === '' || message === '') {
        // If any field is empty, show an alert
        alert("Please fill out all fields.");
    } else {
        // Open modal if all fields are filled
        openModal();
    }

    // Prevent default form submission
    event.preventDefault();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    var modal = document.getElementById("returnMessage");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}