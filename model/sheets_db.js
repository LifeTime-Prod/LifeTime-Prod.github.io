$(document).ready(function () {
    const url = 'https://script.google.com/macros/s/AKfycbxq8rhaWE0TwT8UVAa8-3jbGfpi2sqFi_Dvl3pbldbl1Oz43WbFwemvo7hFrNmOVeQLsQ/exec';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
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
        })
        .catch(error => console.error('Error fetching data:', error));
});