

let myForm = document.getElementById('myForm');
let notificationsBar = document.getElementById('notis');
// let erroricon = document.getElementsByClassName('circle');

let emailValidated = false;
let passwordValidated = false;
let retypePasswordValidated = false;


myForm.addEventListener('submit', async function(event){
    event.preventDefault();
    let emailValue = document.getElementById('email').value;
    let passwordValue = document.getElementById('password').value;
    
/*     validatePassword(passwordValue, passwordRetypeValue);
    validateEmail(emailValue);
    let valid = checkFormValidity(); */
    // console.log(valid);
    // console.log(emailValidated);

        const userCredentials = {
            email: emailValue,
            password: passwordValue
        };

        fetch('https://my-brand-production-b23d.up.railway.app/api/auth/signup', {
            method: 'POST',
            headers: {
                'content-Type' : 'application/json'
            },
            body: JSON.stringify(userCredentials)
        })
        .then(response => {
            if(!response.ok) {

                  alert('error')

            }
            return response.json();
        })
        .then(data => {

            if(data.status === 'failed'){

                  alert('error')

            } else if(data.error === 'Email already exists'){

                   alert('error')

            } else if(data.user.email === emailValue){

                window.location.href = "../pages/login.html";

                document.getElementById('email').value = '';
                document.getElementById('password').value = '';

                }
            console.log('Message sent:', data);
        })
        .catch(error => {

            console.error('There was a problem sending the message:', error);
        });

    }

)


//function to validate the email input
/* function validateEmail(email){
    let emailLabel = document.getElementById('emaillabel');
    let emailPlaceholder = document.getElementById('emailplaceholder');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        emailLabel.style.borderBottomColor = '#c80202';
        emailPlaceholder.style.color = '#c80202';
        emailPlaceholder.innerText = 'Please enter a valid email';
    } else{
        emailLabel.style.borderBottomColor = '#02c837';
        emailPlaceholder.style.color = '#02c837';
        emailPlaceholder.innerText = 'Email';
        emailValidated = true;
    }

} */


//function to validate the password input
/* function validatePassword(password, passwordRetype){
    let passwordLabel = document.getElementById('passwordlabel');
    let passwordPlaceholder = document.getElementById('passwordplaceholder');
    
    let retypepasswordLabel = document.getElementById('retypepasswordlabel');
    let retypepasswordPlaceholder = document.getElementById('retypepasswordplaceholder');

    if(password.length < 6){
        passwordLabel.style.borderBottomColor = '#c80202';
        passwordPlaceholder.style.color = '#c80202';
        passwordPlaceholder.innerText = 'Password must be at least 6 characters';

    } else{
        passwordLabel.style.borderBottomColor = '#02c837';
        passwordPlaceholder.style.color = '#02c837';
        passwordPlaceholder.innerText = 'Password';
        passwordValidated = true;
    }

    if(password !== passwordRetype || passwordRetype == '' || passwordValidated == false) {
        retypepasswordLabel.style.borderBottomColor = '#c80202';
        retypepasswordPlaceholder.style.color = '#c80202';
        retypepasswordPlaceholder.innerText = 'Password does not match';
    } else{
        retypepasswordLabel.style.borderBottomColor = '#02c837';
        retypepasswordPlaceholder.style.color = '#02c837';
        retypepasswordPlaceholder.innerText = 'Confirm Password';
        retypePasswordValidated = true;
    }


} */


//function to check whether everything has been validated
/* function checkFormValidity() {
    if(emailValidated && passwordValidated && retypePasswordValidated){
        document.getElementById('emaillabel').style.borderBottomColor = '#fff';
        document.getElementById('passwordlabel').style.borderBottomColor = '#fff';
        document.getElementById('retypepasswordlabel').style.borderBottomColor = '#fff';
        document.getElementById('emailplaceholder').style.color = '#fff';
        document.getElementById('passwordplaceholder').style.color = '#fff';
        document.getElementById('retypepasswordplaceholder').style.color = '#fff';

        //Set back the validate values to false after a user have sent his message

        emailValidated = false;
        passwordValidated = false;
        retypePasswordValidated = false;

        return 1;

    }  

} */
