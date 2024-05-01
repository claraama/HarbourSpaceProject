
document.addEventListener('DOMContentLoaded', () => {
    fetch(api_url)
        .then(response => response.json())
        .then(data => populateDropdown(data))
        .catch(error => console.error('Error fetching data:', error));
});

function populateDropdown(data) {
    const dropdown = document.getElementById('myDropdown'); 
    data.forEach(item => {
        const option = new Option(item.text, item.value);
        dropdown.add(option);
    });
}
