// add-land.js
function submitLandData() {
    event.preventDefault();

    const location = document.querySelector('#landForm input[name="location"]').value;
    const size = document.querySelector('#landForm input[name="size"]').value;
    const valuation = document.querySelector('#landForm input[name="valuation"]').value;
    const ownerId = localStorage.getItem('userId'); // Retrieve userId from localStorage

    if (!ownerId) {
        alert("Please log in to add land.");
        return;
    }

    const landData = {
        ownerId: ownerId,
        location: location,
        size: parseFloat(size),
        valuation: parseFloat(valuation)
    };

    fetch('http://20.127.219.235:10050/register-land', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(landData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        showPopup('successPopup'); // Show success message
    })
    .catch(error => {
        console.error('Error:', error);
        alert('land added.'); // Show error message
    });

    closePopup('landPopup');
}

function showPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// ... [Any other related functions]
