
// Base URL
let sortUrl = '/sort.html?';

// Global variables
let query;
let coordinates;
let type;

// Called on load of page
function init() {
    getData();
}

function getData() {
    let url = window.location.search;
    let searchParems = new URLSearchParams(url);
    coordinates = `coordinates=${searchParems.get('coordinates')}`;
    type = `type=${searchParems.get('type')}`;
}

function getQuery(event) {
    query = `q=${event.target.dataset.type}`;
}

function loadSortPage() {
    if(coordinates) {
        window.location = `${sortUrl}${coordinates}&${type}&${query}`;
    } else {
        window.location = `${sortUrl}${type}&${query}`;
    }
}

// Category buttons
$('.categories').on('click', function(event) {
    getQuery(event);
    loadSortPage();
})

init();
