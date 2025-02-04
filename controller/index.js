import {createWeekScheduleCard} from "../js/week-card.js";

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
});