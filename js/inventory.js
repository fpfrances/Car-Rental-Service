function toggleFilterForm() {
    var filterForm = document.querySelector('.filter-form');
    filterForm.style.display = (filterForm.style.display === 'none' || filterForm.style.display === '') ? 'block' : 'none';
}

function performSearch() {
    var carName = document.getElementById('carNameFilter').value;
    var manufacturer = document.getElementById('manufacturerFilter').value;
    var year = document.getElementById('yearFilter').value;
    var type = document.getElementById('typeFilter').value;
    var color = document.getElementById('colorFilter').value;
    var id = document.getElementById('idFilter').value;

    
    var searchResultsContainer = document.getElementById('searchResults');
    //this is temp
    searchResultsContainer.innerHTML = '<h2>Search Results</h2><ul><li>Result 1</li><li>Result 2</li></ul>';
}