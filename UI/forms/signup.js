const form = document.getElementById("signUpForm");
const passwordInput = document.getElementById("password");
const passToggleBtn = document.getElementById("pass-toggle-btn");

// Function to display error messages
const showError = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
}


// Retrieving input elements
const fullnameInput = document.getElementById('fullname');
const emailInput = document.getElementById('email');
const dateInput = document.getElementById('date');

// Getting trimmed values from input fields
const fullname = fullnameInput.value.trim();
const email = emailInput.value.trim();
const password = passwordInput.value.trim();
const date = dateInput.value;
// Function to handle form submission
const handleUser = (e) => {
    e.preventDefault();

    // Retrieving input elements
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const dateInput = document.getElementById('date');

    // Getting trimmed values from input fields
    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const date = dateInput.value;

    // Regular expression pattern for email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    // Clearing previous error messages
    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

    // Performing validation checks
    if (fullname === "") {
        showError(fullnameInput, "Enter your full name");
    }
    if (!emailPattern.test(email)) {
        showError(emailInput, "Enter a valid email address");
    }
    if (password === "") {
        showError(passwordInput, "Enter your password");
    }
    if (date === "") {
        showError(dateInput, "Select your date of birth");
    }

    // Checking for any remaining errors before form submission
    const errorInputs = document.querySelectorAll(".form-group .error");
    if (errorInputs.length > 0) return;

    let role="user";
    if (email=== "admin@gmail.com"){
        role = "admin"
    }
    // Storing user data in local storage
    let user_records = JSON.parse(localStorage.getItem("users")) || [];
    if (!Array.isArray(user_records)) {
        user_records = []; // Initialize user_records as an empty array if it's not an array
    }

// Toggling password visibility
passToggleBtn.addEventListener('click', () => {
    passToggleBtn.className = passwordInput.type === "password" ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});
sendData()
}
// Handling form submission event
form.addEventListener("submit", handleUser);
function sendData (){
  alert("sending info")
  let userdata = {
    fullname : fullnameInput.value,
    email : emailInput.value,
    password : passwordInput.value
  }
  console.log(userdata)
  fetch("https://mybrand-backend-up13.onrender.com/users/register", 
 {
  method:"POST",
  body:JSON.stringify(userdata),
  headers:{'Content-Type': 'application/json',
}
 })
 .then(response => response.json())
    .then(data => {
        console.log(data);

             if (data.message=="User registered successfully"){
              
              window.location.href= './signin.html'
             }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};
