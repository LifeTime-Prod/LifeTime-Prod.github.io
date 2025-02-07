import { sendDataToGoogleSheet } from "../model/sheets_db.js";

$(document).ready(function () {
    $('#contact-form').on('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = {
            name: $('#name').val(),
            message: $('#message').val(),
            extra: $('#extra').val(),
            email: $('#email').val(),
            color: $('#color').val()
        };

        console.log(formData);

        try {
            const docRef = await addDoc(collection(db, "contacts"), formData);
            console.log("Document written with ID: ", docRef.id);
            $('.thankyou_message').show();
            $('#contact-form').hide();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    });

    console.log('test')
});