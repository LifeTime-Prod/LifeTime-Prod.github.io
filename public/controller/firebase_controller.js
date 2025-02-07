import { addUser, getUser, getAllUsers, registerUser, loginUser } from '../model/firebase_model.js';
import { auth } from '../js/firebase_init.js'; // Import the initialized auth

// Function to handle form submission
async function submitRegisterForm(event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Get form values
    const firstName = document.querySelector('input[id="r_firstname"]').value;
    const lastName = document.querySelector('input[id="r_lastname"]').value;
    const email = document.querySelector('input[id="r_email"]').value;
    const password = document.querySelector('input[id="r_password"]').value;
    const confirmPassword = document.querySelector('input[id="r_cpassword"]').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // Register the user with Firebase Authentication
        const user = await registerUser(email, password);

        // Add the new user to the Firebase database
        const newUser = {
            uid: user.uid,
            firstName: firstName,
            lastName: lastName,
            email: email
        };
        await addUser(newUser);

        alert('User registered successfully!');
    } catch (error) {
        console.error('Error registering user:', error);
        alert('Error registering user: ' + error.message);
    }
}

async function submitLoginForm(event) {
    event.preventDefault();

    const email = document.querySelector('input[id="l_email"]').value;
    const password = document.querySelector('input[id="l_password"]').value;


    try {
        // Log in the user with Firebase Authentication
        const user = await loginUser(email, password);
        console.log(user.uid);
         // Retrieve the user's name from the Firebase database
        const userData = await getUser(user.uid);
        if (userData) {
            const userName = `${userData.firstName} ${userData.lastName}`;
            // Store login state and user name in local storage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', userName);

            alert('User logged in successfully!');
            window.location.href = '../index.html';
        } else {
            console.log("No user data found");
            alert('No user data found');
        }

    } catch (error) {
        console.error('Error logging in user:', error);
        alert('Error logging in user: ' + error.message);
    }
}


function logOutUser(){
    signOut(auth).then(() => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');

        alert('User logged out successfully!');
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Error logging out user:', error);
        alert('Error logging out user: ' + error.message);
    });
}

async function fetchUserData(userId) {
    const userData = await getUser(userId);
    if (userData) {
        console.log("User data:", userData);
    } else {
        console.log("No user data found");
    }
}

async function fetchAllUsersData() {
    const usersData = await getAllUsers();
    if (usersData) {
        console.log("All users data:", usersData);
    } else {
        console.log("No users data found");
    }
}


document.getElementById('registerForm').addEventListener('submit', submitRegisterForm);
document.getElementById('loginForm').addEventListener('submit', submitLoginForm);
document.getElementById('logoutButton').addEventListener('click', logOutUser);

// Call the fetchUserData function to retrieve user data
// fetchAllUsersData();