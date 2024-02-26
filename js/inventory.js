function toggleFilterForm() {
    var filterForm = document.querySelector('.filter-form');
    filterForm.style.display = (filterForm.style.display === 'none' || filterForm.style.display === '') ? 'block' : 'none';
}

async function performSearch() {
    var searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = ''; // Clear previous search results

    var query = buildQuery(); // Build query parameters

    try {
        var response = await fetch('http://localhost:3000/vehicles' + query);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        var data = await response.json();
        displaySearchResults(data); // Display search results
    } catch (error) {
        console.error('Error fetching data:', error);
        searchResultsContainer.innerHTML = '<p>Error fetching data. Please try again later.</p>';
    }
}

function buildQuery() {
    var manufacturer = document.getElementById('manufacturerFilter').value;
    var carName = document.getElementById('carNameFilter').value;
    var year = document.getElementById('yearFilter').value;
    var type = document.getElementById('typeFilter').value;
    var color = document.getElementById('colorFilter').value;
    var id = document.getElementById('idFilter').value;

    var queryParams = [];
    if (manufacturer) queryParams.push('manufacturer=' + encodeURIComponent(manufacturer));
    if (carName) queryParams.push('carName=' + encodeURIComponent(carName));
    if (year) queryParams.push('year=' + encodeURIComponent(year));
    if (type) queryParams.push('type=' + encodeURIComponent(type));
    if (color) queryParams.push('color=' + encodeURIComponent(color));
    if (id) queryParams.push('id=' + encodeURIComponent(id));

    return queryParams.length > 0 ? '?' + queryParams.join('&') : '';
}

function displaySearchResults(data) {
    var searchResultsContainer = document.getElementById('searchResults');
    if (data.length === 0) {
        searchResultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    var html = '<h2>Search Results</h2><ul>';
    data.forEach(function(vehicle) {
        html += '<li>';
        html += '<b>Brand:</b> ' + vehicle.manufacturer + '<br>';
        html += '<b>Model:</b> ' + vehicle.vehicleName + '<br>';
        html += '<b>Year:</b> ' + vehicle.year + '<br>';
        html += '<b>Color:</b> ' + vehicle.color + '<br>';
        html += '<b>Type:</b> ' + vehicle.type + '<br>';
        html += '</div>';
        html += '<hr>'; // Add horizontal line between cars
    });
    html += '</ul>';

    searchResultsContainer.innerHTML = html;
}