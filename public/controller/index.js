import {createWeekScheduleCard} from "../js/week-card.js";
import { fetchDataFromGoogleSheet } from "../model/sheets_db.js";
import { auth } from '../js/firebase_init.js'; // Import the initialized auth

let currentWeek = {
    monday: {
        title: "Monday",
        text: "Text",
        back_title: "Monday",
        back_text: "Text"
    },
    tuesday: {
        title: "Tuesday",
        text: "Text",
        back_title: "Monday",
        back_text: "Text"
    },
    wednesday: {
        title: "Wednesday",
        text: "Text",
        back_title: "Monday",
        back_text: "Text"
    },
    thursday: {
        title: "Thursday",
        text: "Text",
        back_title: "Monday",
        back_text: "Text"
    },
    friday: {
        title: "Friday",
        text: "Text",
        back_title: "Monday",
        back_text: "Text"
    },
    saturday: {
        title: "Saturday",
        text: "Text",
        back_title: "Monday",
        back_text: "Text"
    },
    sunday: {
        title: "Sunday",
        text: "Text",
        back_title: "Monday",
        back_text: "Text"
    }
}

$(document).ready(function () {

    for (let day in currentWeek) {
        let card = createWeekScheduleCard(currentWeek[day].title, currentWeek[day].text, currentWeek[day].back_title, currentWeek[day].back_text);
        $(".week-schedule").append(card);
        console.log(day)
    }

    const xValues = ["Weight", "Height", "Something", "Here", "Check"];
    const yValues = [55, 49, 44, 24, 15];
    const barColors = ["red", "green","blue","orange","brown"];

    new Chart("firstChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
        options: { xValues: barColors }
    });

    new Chart("secondChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: barColors,
            data: yValues
            }]
        },
        options: { xValues: barColors }
    });

    fetchDataFromGoogleSheet();

    
});

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');
    console.log("isLoggedIn:", isLoggedIn);
    console.log("userName:", userName);

    if (isLoggedIn === 'true') {
        const loginLink = document.querySelector('.choose-create-user');
        console.log("loginLink:", loginLink);
        if (loginLink) {
            loginLink.textContent = `Welcome, ${userName}`;
            loginLink.href = '#';
            loginLink.style.pointerEvents = 'none'; // Disable the link
        }

        // Add the logout button
        const logoutPlaceholder = document.getElementById('logoutPlaceholder');
        console.log("logoutPlaceholder:", logoutPlaceholder);
        if (logoutPlaceholder) {
            const logoutButton = document.createElement('a');
            logoutButton.href = '#';
            logoutButton.className = 'sidebar-item';
            logoutButton.textContent = 'Logout';
            logoutButton.addEventListener('click', function() {
                signOut(auth).then(() => {
                    // Clear local storage
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userName');

                    alert('User logged out successfully!');
                    window.location.href = 'index.html';
                }).catch((error) => {
                    console.error('Error logging out user:', error);
                    alert('Error logging out user: ' + error.message);
                });
            });
            logoutPlaceholder.appendChild(logoutButton);
        }
    }
});