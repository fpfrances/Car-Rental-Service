function toggleFilterForm() {
    var filterForm = document.querySelector('.filter-form');
    filterForm.style.display = (filterForm.style.display === 'none' || filterForm.style.display === '') ? 'block' : 'none';
}

async function performSearch() {
    var searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = ''; // Clear previous search results

    try {
        var response = await fetch('https://car-rental-service-s9zk.onrender.com/vehicles');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        var data = await response.json();
        
        // Retrieve filter criteria from the filter form
        var manufacturerFilter = document.getElementById('manufacturerFilter').value;
        var carNameFilter = document.getElementById('carNameFilter').value;
        var yearFilter = document.getElementById('yearFilter').value;
        var typeFilter = document.getElementById('typeFilter').value;
        var colorFilter = document.getElementById('colorFilter').value;
        var licensePlateFilter = document.getElementById('licensePlateFilter').value;
        
        // Apply filter criteria to the fetched data
        var filteredData = data.filter(vehicle => {
            return (!manufacturerFilter || vehicle.manufacturer.toLowerCase().includes(manufacturerFilter.toLowerCase())) &&
                   (!carNameFilter || vehicle.vehicleName.toLowerCase().includes(carNameFilter.toLowerCase())) &&
                   (!yearFilter || vehicle.year.toLowerCase().includes(yearFilter.toLowerCase())) &&
                   (!typeFilter || vehicle.type.toLowerCase().includes(typeFilter.toLowerCase())) &&
                   (!colorFilter || vehicle.color.toLowerCase().includes(colorFilter.toLowerCase())) &&
                   (!licensePlateFilter || vehicle.licensePlate.toLowerCase().includes(licensePlateFilter.toLowerCase())) &&
                   vehicle.status === 'A';
        });
        
        displaySearchResults(filteredData); // Display search results
    } catch (error) {
        console.error('Error fetching data:', error);
        searchResultsContainer.innerHTML = '<p>Error fetching data. Please try again later.</p>';
    }
}


function buildQuery() {
    var queryParams = [];

    var manufacturer = document.getElementById('manufacturerFilter').value;
    if (manufacturer) queryParams.push('manufacturer=' + encodeURIComponent(manufacturer));

    var carName = document.getElementById('carNameFilter').value;
    if (carName) queryParams.push('vehicleName=' + encodeURIComponent(carName));

    var year = document.getElementById('yearFilter').value;
    if (year) queryParams.push('year=' + encodeURIComponent(year));

    var type = document.getElementById('typeFilter').value;  
    if (type) queryParams.push('type=' + encodeURIComponent(type));

    var color = document.getElementById('colorFilter').value;
    if (color) queryParams.push('color=' + encodeURIComponent(color));

    var licensePlate = document.getElementById('licensePlateFilter').value;
    if (licensePlate) queryParams.push('licensePlate=' + encodeURIComponent(licensePlate));

    return queryParams.length > 0 ? '?' + queryParams.join('&') : '';
}


async function displaySearchResults(data) {
    var searchResultsContainer = document.getElementById('searchResults');
    if (data.length === 0) {
        searchResultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    var html = '<h2>Search Results</h2><ul>';
    for (const vehicle of data) {
        html += '<li>';
        html += '<b>Manufacturer:</b> ' + vehicle.manufacturer + '<br>';
        html += '<b>Model:</b> ' + vehicle.vehicleName + '<br>';
        html += '<b>Year:</b> ' + vehicle.year + '<br>';
        html += '<b>Type:</b> ' + vehicle.type + '<br>';
        html += '<b>Color:</b> ' + vehicle.color + '<br>';
        html += '<b>License Plate:</b> ' + vehicle.licensePlate + '<br>';

        // Status
        html += '<b>Status:</b> ';
        if (vehicle.status === 'A') {
            html += 'Available';
            html += '<br>';
            // Add rent button for available vehicles
            html += `<button class="rent-button" data-license-plate="${vehicle.licensePlate}"><b>Rent</b></button>`;
            //html += '<br>';
        } 
        html += '<br>';
        html += '</li>';
        html += '<hr>'; // Add horizontal line between cars
    }
    html += '</ul>';

    searchResultsContainer.innerHTML = html;

    // Add event listeners to rent buttons
    const rentButtons = document.querySelectorAll('.rent-button');
    rentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const licensePlate = this.getAttribute('data-license-plate');
            rentCar(licensePlate);
        });
    });
}

function renderSearchResults(vehicles) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = ''; // Clear previous search results
    vehicles.forEach(vehicle => {
        if (vehicle.status === 'Available') {
            const vehicleDiv = document.createElement('div');
            // Create HTML content for each vehicle
            const vehicleInfo = `
                <h3>Vehicle: ${vehicle.manufacturer}</h3>
                <h3>Model:${vehicle.vehicleName}</h3>
                <p>Year: ${vehicle.year}</p>
                <p>Color: ${vehicle.color}</p>
                <p>License Plate: ${vehicle.licensePlate}</p>
                <p>Status: ${vehicle.status}</p>
            `;
            vehicleDiv.innerHTML = vehicleInfo;
            // Create and append the rent button
            const rentButton = document.createElement('button');
            rentButton.textContent = 'Rent';
            rentButton.addEventListener('click', function() {
                // Redirect to rental page with vehicle ID
                window.location.href = `../pages/rentalCustomer.html?id=${vehicle._id}`;
            });
            vehicleDiv.appendChild(rentButton); // Append rent button to vehicle div
            searchResultsContainer.appendChild(vehicleDiv); // Append vehicle div to search results container
        }
    });
}

