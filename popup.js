function showPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}

// Add event listeners for form submissions (example)
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Logic to handle user data submission
});

document.getElementById('landForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Logic to handle land data submission
});


