import {createWeekScheduleCard} from "../js/week-card.js";
import { fetchDataFromGoogleSheet } from "../model/sheets_db.js";
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
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
        // console.log(day)
    }

    // const userId = 'uvMsBkcZjWYIxQHM6eRl30hZaNy2'; // Replace with actual user ID
    // const weekSchedule = await getCurrentWeekSchedule(userId);

    // for (const [day, events] of Object.entries(weekSchedule)) {
    //     let frontText = '';
    //     let backText = '';
    //     events.forEach(event => {
    //         frontText += `${event.title}\n`;
    //         backText += `${event.title}: ${event.description}\n`;
    //     });
        
    //     let card = createWeekScheduleCard(day.charAt(0).toUpperCase() + day.slice(1), frontText, day.charAt(0).toUpperCase() + day.slice(1), backText);
    //     $(".week-schedule").append(card);
    // }

    const xValues = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const yValues = ["10kg", "11kg", "12kg", "13kg", "14kg", "15kg", "16kg"];

    new Chart("firstChart", {
    type: "line",
    data: {
            labels: xValues,
            datasets: [{
                fill: false,
                backgroundColor:"rgba(0,0,255,1.0)",
                borderColor: "rgba(0,0,255,0.1)",
                data: yValues
            }]
        },
        options:{ 
            legend: {display: false},
            scales: {
            yAxes: [{ticks: {min: 6, max:16}}],
            }
        }
    });

    new Chart("secondChart", {
        type: "line",
        data: {
                labels: xValues,
                datasets: [{
                    fill: false,
                    backgroundColor:"rgba(0,0,255,1.0)",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: yValues
                }]
            },
            options:{ 
                legend: {display: false},
                scales: {
                yAxes: [{ticks: {min: 6, max:16}}],
                }
            }
        });

    fetchDataFromGoogleSheet();

    $(".dropdown-btn").click(function() {
        $(".dropdown-content").toggle();
    });

    
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