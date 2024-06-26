let myForm = document.getElementById('myForm');
let notificationsBar = document.getElementById('notis');

//Variables to track the validates inputs
let nameValidated = false;
let emailValidated = false;
let messageValidated = false;

//listening for submit event in order to validate
myForm.addEventListener('submit', function(event){
    event.preventDefault();
    let nameValue = document.getElementById('name').value;
    let emailValue = document.getElementById('email').value;
    let messageValue = document.getElementById('message').value;
    
    validateName(nameValue);
    validateEmail(emailValue);
    validateMessage(messageValue);
    checkFormValidity();

})

//function to validate the name input
function validateName(name){
    let nameLabel = document.getElementById('namelabel');
    let namePlaceholder = document.getElementById('nameplaceholder');

    if(name.length < 2){
        nameLabel.style.borderBottomColor = '#c80202';
        namePlaceholder.style.color = '#c80202';
        namePlaceholder.innerText = 'Please enter your name';

    } else{
        nameLabel.style.borderBottomColor = '#02c837';
        namePlaceholder.style.color = '#02c837';
        namePlaceholder.innerText = 'Name';
        nameValidated = true;
    }

}

//function to validate the message input
function validateMessage(message){
    let messageLabel = document.getElementById('messagelabel');

    if(message.length < 1){
        messageLabel.style.borderBottomColor = '#c80202';
    } else{
        messageLabel.style.borderBottomColor = '#02c837';
        messageValidated = true;
    }

}

//function to validate the email input
function validateEmail(email){
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

};


let name = document.getElementById('name');
let email = document.getElementById('email');
let message = document.getElementById('message');



//function to check whether everything has been validated
function checkFormValidity() {
    if(emailValidated && nameValidated && messageValidated){



        const messageData = {
            name: name.value,
            email: email.value,
            message: message.value
        };

        fetch('https://my-brand-production-b23d.up.railway.app/api/contactme', {
            method: 'POST',
            headers: {
                'content-Type' : 'application/json'
            },
            body: JSON.stringify(messageData)
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

            } else{

                name.value = '';
                email.value = '';
                message.value = '';

                }
            console.log('Message sent:', data);
        })
        .catch(error => {

            console.error('There was a problem sending the message:', error);
        });




        storeuserMessage(name, email, message);

        document.getElementById('messagelabel').style.borderBottomColor = '#fff';
        document.getElementById('emaillabel').style.borderBottomColor = '#fff';
        document.getElementById('namelabel').style.borderBottomColor = '#fff';
        document.getElementById('nameplaceholder').style.color = '#757575';
        document.getElementById('emailplaceholder').style.color = '#757575';

    }   

    //Set back the validate values to false after a user have sent his message
    nameValidated = false;
    emailValidated = false;
    messageValidated = false;

}


//local storage

function storeuserMessage(name, email, message){

    let existingMessages = JSON.parse(localStorage.getItem('userMessages')) || [];

    let userMessage = [name.value, email.value, message.value];

    existingMessages.push(userMessage);
    
    localStorage.setItem('userMessages', JSON.stringify(existingMessages));
}
