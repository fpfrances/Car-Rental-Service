document.addEventListener('DOMContentLoaded', function () {
    //handle form submission

})


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