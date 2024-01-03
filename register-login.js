// Function to handle registration
function handleRegistration(event) {
    event.preventDefault(); // Prevent default form submission

    document.getElementById('loader').style.display = 'block'; // Show loader

    const registrationData = {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        mobile: document.getElementById('mobile').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    fetch('http://20.127.219.235:10050/register-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('loader').style.display = 'none'; // Hide loader
        alert('Registration successful!'); // Show success message
        login(); // Automatically switch to login form
    })
    .catch(error => {
        console.error('Registration Error:', error);
        document.getElementById('loader').style.display = 'none'; // Hide loader
        alert('Registration failed. Please try again.'); // Show error message
    });
}

// Function to handle login
function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission

    const loginData = {
        email: document.getElementById('LoginForm').elements['username'].value,
        password: document.getElementById('LoginForm').elements['password'].value
    };

    fetch('http://20.127.219.235:10050/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Store userId and token
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('token', data.token);

            window.location.href = 'home.html'; // Redirect on successful login
        } else {
            alert('Invalid login credentials.'); // Error message for invalid login
        }
    })
    .catch(error => {
        console.error('Login Error:', error);
        alert('Login failed. Please try again.'); // Error message on login failure
    });
}

// Functions to switch between login and register forms
function register() {
    document.getElementById('RegForm').style.transform = "translateX(0px)";
    document.getElementById('LoginForm').style.transform = "translateX(0px)";
    document.getElementById('Indicator').style.transform = "translateX(100px)";
}

function login() {
    document.getElementById('RegForm').style.transform = "translateX(300px)";
    document.getElementById('LoginForm').style.transform = "translateX(300px)";
    document.getElementById('Indicator').style.transform = "translateX(0px)";
}

// Add event listeners to forms
document.getElementById('RegForm').addEventListener('submit', handleRegistration);
document.getElementById('LoginForm').addEventListener('submit', handleLogin);