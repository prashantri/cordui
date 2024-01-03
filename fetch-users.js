document.addEventListener('DOMContentLoaded', function() {
    // Fetch users and populate the dropdown
    fetch('http://20.127.219.235:10050/users')
        .then(response => response.json())
        .then(users => {
            const usersDropdown = document.getElementById('users');
            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                usersDropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching users:', error));

    // Function to show a success message
    function showSuccessMessage() {
        alert("User registered successfully!");
    }

    // Add event listener for the user form submission
    document.getElementById('userForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Create user object from form data
        const userData = {
            name: event.target.elements['name'].value,
            address: event.target.elements['address'].value,
            mobile: event.target.elements['mobile'].value,
            email: event.target.elements['email'].value
        };

        // POST request to register a new user
        fetch('http://20.127.219.235:10050/register-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            showSuccessMessage(); // Show success message
            closePopup('userPopup'); // Optionally, close the popup if the registration is successful
        })
        .catch(error => {
            console.error('Error during user registration:', error);
            // Handle error here (e.g., showing an error message)
        });
    });
});
