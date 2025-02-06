// $(document).ready(function () {
//     const url = 'https://script.google.com/macros/s/AKfycbwf8TACuBWvYmwIdTc6RhMeV7vAkdjJKhFjJdHNoXVlp-pbhHqDb-hvsCmvSt9g9O0H8A/exec';

//     $.ajax({
//         url: url,
//         dataType: 'jsonp',
//         success: function(data) {
//             console.log(data);
//             // Process the data as needed
//             let html = '<table border="1">';
//             data.forEach(row => {
//                 html += '<tr>';
//                 row.forEach(cell => {
//                     html += `<td>${cell}</td>`;
//                 });
//                 html += '</tr>';
//             });
//             html += '</table>';
//             $('#data-container').html(html);
//         },
//         error: function(error) {
//             console.error('Error fetching data:', error);
//         }
//     });
// });

export async function fetchDataFromGoogleSheet() {
    const url = 'https://script.google.com/macros/s/AKfycbwf8TACuBWvYmwIdTc6RhMeV7vAkdjJKhFjJdHNoXVlp-pbhHqDb-hvsCmvSt9g9O0H8A/exec?callback=?';

    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function(data) {
                console.log(data);
                // Process the data as needed
                let html = '<table border="1">';
                data.forEach(row => {
                    html += '<tr>';
                    row.forEach(cell => {
                        html += `<td>${cell}</td>`;
                    });
                    html += '</tr>';
                });
                html += '</table>';
                $('#data-container').html(html);
                resolve(data);
            },
            error: function(error) {
                console.error('Error fetching data:', error);
                reject(error);
            }
        });
    });
}

export async function sendDataToGoogleSheet(data, googleSheetUrl) {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open('POST', googleSheetUrl, true);
        request.setRequestHeader('Content-Type', 'application/json');

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    console.log(request.responseText);
                    resolve(JSON.parse(request.responseText));
                } else {
                    console.error('Error sending data:', request.statusText);
                    reject(new Error(request.statusText));
                }
            }
        };

        request.onerror = function() {
            console.error('Network error');
            reject(new Error('Network error'));
        };

        request.send(JSON.stringify(data));
    });
}


// fetchDataFromGoogleSheet();