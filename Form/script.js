const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");

const successMessage =
document.getElementById("successMessage");

function showError(input, message, errorId) {

    document.getElementById(errorId).textContent = message;

    input.classList.remove("success-input");
    input.classList.add("error-input");
}

function showSuccess(input, errorId) {

    document.getElementById(errorId).textContent = "";

    input.classList.remove("error-input");
    input.classList.add("success-input");
}

/* Name Validation */

function validateName() {

    const value = nameInput.value.trim();

    if(value === "") {
        showError(
            nameInput,
            "Name is required",
            "nameError"
        );
        return false;
    }

    if(value.length < 3) {
        showError(
            nameInput,
            "Minimum 3 characters required",
            "nameError"
        );
        return false;
    }

    showSuccess(nameInput,"nameError");
    return true;
}

/* Email Validation */

function validateEmail() {

    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailInput.value.trim() === "") {

        showError(
            emailInput,
            "Email is required",
            "emailError"
        );
        return false;
    }

    if(!emailPattern.test(emailInput.value)) {

        showError(
            emailInput,
            "Invalid email format",
            "emailError"
        );
        return false;
    }

    showSuccess(emailInput,"emailError");
    return true;
}

/* Phone Validation */

function validatePhone() {

    const phonePattern =
    /^[0-9]{8,15}$/;

    if(phoneInput.value.trim() === "") {

        showError(
            phoneInput,
            "Phone number is required",
            "phoneError"
        );
        return false;
    }

    if(!phonePattern.test(phoneInput.value)) {

        showError(
            phoneInput,
            "Enter 8-15 digits only",
            "phoneError"
        );
        return false;
    }

    showSuccess(phoneInput,"phoneError");
    return true;
}

/* Password Validation */

function validatePassword() {

    const password =
    passwordInput.value;

    const strengthBar =
    document.getElementById("strengthBar");

    const strengthText =
    document.getElementById("strengthText");

    let strength = 0;

    if(password.length >= 8) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(/[^A-Za-z0-9]/.test(password)) strength++;

    if(password === "") {

        showError(
            passwordInput,
            "Password is required",
            "passwordError"
        );

        strengthBar.style.width = "0%";
        strengthText.textContent = "";

        return false;
    }

    if(password.length < 8) {

        showError(
            passwordInput,
            "Password must contain at least 8 characters",
            "passwordError"
        );

        return false;
    }

    showSuccess(passwordInput,"passwordError");

    switch(strength){

        case 1:
            strengthBar.style.width = "25%";
            strengthBar.style.background = "red";
            strengthText.textContent = "Weak";
            break;

        case 2:
            strengthBar.style.width = "50%";
            strengthBar.style.background = "orange";
            strengthText.textContent = "Fair";
            break;

        case 3:
            strengthBar.style.width = "75%";
            strengthBar.style.background = "gold";
            strengthText.textContent = "Good";
            break;

        case 4:
            strengthBar.style.width = "100%";
            strengthBar.style.background = "green";
            strengthText.textContent = "Strong";
            break;
    }

    return true;
}

/* Real-Time Validation */

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);
passwordInput.addEventListener("input", validatePassword);

/* Focus & Blur Events */

const inputs =
document.querySelectorAll("input");

inputs.forEach(input => {

    input.addEventListener("focus", () => {
        input.style.background = "#f8fafc";
    });

    input.addEventListener("blur", () => {
        input.style.background = "#ffffff";
    });

});

/* Form Submission */

form.addEventListener("submit", function(e){

    e.preventDefault();

    const validName = validateName();
    const validEmail = validateEmail();
    const validPhone = validatePhone();
    const validPassword = validatePassword();

    if(
        validName &&
        validEmail &&
        validPhone &&
        validPassword
    ){

        successMessage.textContent =
        "✓ Registration Successful!";

        form.reset();

        document.getElementById("strengthBar").style.width = "0%";
        document.getElementById("strengthText").textContent = "";
    }
});