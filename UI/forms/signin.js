
const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

form.addEventListener("submit" ,  (e) => {
  e.preventDefault(); 

  // Check if email and password are blank
  // if (eInput.value == "") {
  //   eField.classList.add("shake", "error");
  // } else {
  //   eField.classList.remove("error");
  //   eField.classList.add("valid");
  // }

  // if (pInput.value == "") {
  //   pField.classList.add("shake", "error");
  // } else {
  //   pField.classList.remove("error");
  //   pField.classList.add("valid");
  // }

  // setTimeout(() => { // Remove shake class after 500ms
  //   eField.classList.remove("shake");
  //   pField.classList.remove("shake");
  // }, 500);

  sendInfo()
})
function sendInfo() {
  alert("sending info")
  let userlog = {
    email: emailInput.value,
    password: passwordInput.value
  }
  console.log(userlog)
  fetch("https://mybrand-backend-up13.onrender.com/users/login",
    {
      method: "POST",
      body: JSON.stringify(userlog),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      if (data.message =='User logged in successfully') {
     
        localStorage.setItem("userlog", data.user)
        localStorage.setItem("token",  JSON.stringify(data?.token));

        if (data.user.userRole == "admin") {
          var adminIsLoggedIn = localStorage.setItem('adminIsLoggedIn', true);
          window.location.href = "./dashboard/dash.html"
        }
        else {
          var userIsLoggedIn = localStorage.setItem('userIsLoggedIn',);
          window.location.href = './home.html'
        }
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
    window.onload = function() {
      var userIsLoggedIn = localStorage.getItem('userIsLoggedIn');
      var adminIsLoggedIn = localStorage.getItem('adminIsLoggedIn');
    
      if (userIsLoggedIn) {

          window.location.href = "./home.html";
      } else if (adminIsLoggedIn) {

          window.location.href = "./dashboard/dash.html"
            }
    }
};


