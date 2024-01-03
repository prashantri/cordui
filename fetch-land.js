document.addEventListener('DOMContentLoaded', function() {
    // Existing code to fetch users...

    // Fetch lands and populate the available lands section
    fetch('http://20.127.219.235:10050/lands')
        .then(response => response.json())
        .then(lands => {
            const availableLandList = document.getElementById('availableLandList');
            lands.forEach(land => {
                const landDiv = document.createElement('div');
                landDiv.className = 'land-item';
                landDiv.innerHTML = `
                    <h3>Land at ${land.location}</h3>
                    <p>Owner ID: ${land.ownerId}</p>
                    <p>Location: ${land.location}</p>
                    <p>Size: ${land.size} sq. units</p>
                    <p>Valuation: $${land.valuation}</p>
                `;
                availableLandList.appendChild(landDiv);
            });
        })
        .catch(error => console.error('Error fetching lands:', error));
});
