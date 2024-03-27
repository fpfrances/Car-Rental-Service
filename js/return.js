document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const searchResultsDiv = document.getElementById('searchResults');

    searchForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent form submission
    
        const searchParams = {
            customerName: document.getElementById('searchCustomerName').value,
            customerEmail: document.getElementById('searchCustomerEmail').value,
            customerAddress: document.getElementById('searchCustomerAddress').value,
            pickupDate: document.getElementById('searchPickupDate').value,
            dropoffDate: document.getElementById('searchDropoffDate').value,
        };

        try {
            const queryString = Object.keys(searchParams).map(key => key + '=' + encodeURIComponent(searchParams[key])).join('&');

            const response = await fetch('/return?' + queryString);
            if (!response.ok) {
                throw new Error('Failed to fetch reservations');
            }

            const rentals = await response.json();
            displayRentals(rentals)
        } catch (error) {
            console.error('Error!', error);
            searchResultsDiv.textContent = 'Failed to submit reservation. Please try again later.';
        }
    });

    function displayRentals(rentals) {
        // Clear any previous search results
        searchResultsDiv.innerHTML = '';

        // Display each reservation
        rentals.forEach(rental => {
            const rentalDiv = document.createElement('div');
            rentalDiv.innerHTML = `
            <p><b>Customer Name:</b> ${rental.customerName}</p>
            <p><b>Customer Email:</b> ${rental.customerEmail}</p>
            <p><b>Pickup Date:</b> ${new Date(rental.pickupDate).toLocaleDateString()}</p>
            <p><b>Dropoff Date:</b> ${new Date(rental.dropoffDate).toLocaleDateString()}</p>
            <hr></hr>
            `;
        searchResultsDiv.appendChild(rentalDiv);
        });
    }
});