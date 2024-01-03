// Function to fetch lands for the logged-in user and populate the "My Land" section
function fetchLandsForLoggedInUser() {
    // Retrieve the user ID from localStorage
    const loggedInUserId = localStorage.getItem('userId');

    if (loggedInUserId) {
        fetch(`http://20.127.219.235:10050/lands-by-owner/${loggedInUserId}`)
            .then(response => response.json())
            .then(lands => {
                const myLandList = document.getElementById('myLandList');
                myLandList.innerHTML = ''; // Clear existing lands
                lands.forEach(land => {
                    const landDiv = document.createElement('div');
                    landDiv.className = 'land-item';
                    landDiv.innerHTML = `
                        <h3>Land at ${land.location}</h3>
                        <p>Owner ID: ${land.ownerId}</p>
                        <p>Location: ${land.location}</p>
                        <p>Size: ${land.size} sq. units</p>
                        <p>Valuation: $${land.valuation}</p>
                        <span style="font-weight:bold;">Transfer Land to:</span>
                        <select class="transfer-dropdown" id="transfer-to-${land.landId}" style="width: 150px; height: 25px;"></select>
                        <button onclick="initiateLandTransfer('${land.landId}')">Transfer</button>
                    `;
                    myLandList.appendChild(landDiv);

                    populateTransferDropdown(`transfer-to-${land.landId}`, loggedInUserId);
                });
            })
            .catch(error => console.error('Error fetching lands:', error));
    } else {
        console.log("No user ID found for fetching lands.");
    }
}

// Function to populate the transfer dropdown
function populateTransferDropdown(dropdownId, excludeUserId) {
    const dropdown = document.getElementById(dropdownId);

    fetch('http://20.127.219.235:10050/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                if (user.id !== excludeUserId) {
                    const option = document.createElement('option');
                    option.value = user.id;
                    option.textContent = user.name;
                    dropdown.appendChild(option);
                }
            });
        })
        .catch(error => console.error('Error fetching users for transfer:', error));
}

// Function to initiate land transfer
function initiateLandTransfer(landId) {
    const transferToUserId = document.getElementById(`transfer-to-${landId}`).value;

    if (!transferToUserId) {
        alert("Please select a user to transfer the land to.");
        return;
    }

    const transferData = {
        landId: landId,
        newOwnerId: transferToUserId
    };

    fetch('http://20.127.219.235:10050/transfer-land', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transferData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert("Land transfer successful!");
        fetchLandsForLoggedInUser(); // Refresh the land list
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("Land Transfered transferring land.");
    });
}

// Call fetchLandsForLoggedInUser when the page loads
fetchLandsForLoggedInUser();
