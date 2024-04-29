const registrationForm = document.getElementById('registrationForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    let valid = true;

    if (username.length < 6) {
        showError(usernameError, 'Username must be at least 6 characters');
        valid = false;
    }

    if (!validEmail(email)) {
        showError(emailError, 'Invalid email format');
        valid = false;
    }

    if (password.length < 8) {
        showError(passwordError, 'Password must be at least 8 characters');
        valid = false;
    } else if (!containsCapitalLetter(password) || !containsNumber(password)) {
        showError(passwordError, 'Password must contain at least one capital letter and one number');
        valid = false;
    }

    if (valid) {
        alert('Registration successful!');
        registrationForm.reset();
    }
});

function clearErrors() {
    usernameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
}

function showError(element, message) {
    element.textContent = message;
}

function validEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return emailRegex.test(email);
}
function containsCapitalLetter(str) {
    return /[A-Z]/.test(str);
}

function containsNumber(str) {
    return /\d/.test(str);
}