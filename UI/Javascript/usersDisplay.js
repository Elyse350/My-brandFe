let notificationsBar = document.getElementById('notis');

//function to get the cookie
function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

var tokenCookie = getCookie('jwt');


//Getting all the users
fetch('https://my-brand-production-b23d.up.railway.app/api/auth/users', {
headers: {
    'Authorization': `Bearer ${tokenCookie}`,
    'Content-Type': 'application/json'
}
})
.then(data => {
    return data.json();
})
.then(users => {
    displayUserAccounts(users);
    console.log(users);
});



//function to display all the users
function displayUserAccounts(users) {
    const userListDiv = document.getElementById('userList');
    userListDiv.innerHTML = ''; // Clear previous content

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.dataset.userId = user._id;
        userDiv.innerHTML = `
            <p>Email: ${user.email}</p>
            </div>
        `;
        userListDiv.appendChild(userDiv);

        const deleteUserBtns = userDiv.querySelectorAll('.deleteUserBtn');
        deleteUserBtns.forEach(button => {
            button.addEventListener('click', function() {
                // Retrieve the user ID from the data attribute
                const userId = this.parentElement.parentElement.dataset.userId;
                 // Call delete function and pass the user ID
                deleteUser(userId);
            });
        });

        const editUserBtns = userDiv.querySelectorAll('.changeUserRoleBtn');
        editUserBtns.forEach(button => {
            button.addEventListener('click', function() {
                // Retrieve the user ID from the data attribute
                const userId = this.parentElement.parentElement.dataset.userId;
                 // Call edit function and pass the user ID
                editUserROle(userId);
            });
        });

    });
}


function deleteUser(userId){

        fetch(`https://my-brand-production-b23d.up.railway.app/api/auth/users/${userId}`, {
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${tokenCookie}`,
            'content-Type' : 'application/json'
        }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {

            displayUserAccounts(data.users);
            console.log(data);
        })
        .catch(error => {

            console.error('There was a problem sending the message:', error);
        });

}



function editUserROle(userId){

        fetch(`https://my-brand-production-b23d.up.railway.app/api/auth/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${tokenCookie}`,
            'content-Type' : 'application/json'
        }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {

            displayUserAccounts(data.users);
            console.log(data);
        })
        .catch(error => {

            console.error('There was a problem sending the message:', error);
        });

}
