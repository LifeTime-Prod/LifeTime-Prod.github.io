async function fetchDataFromGeminiAI() {
    const url = 'https://api.gemini.com/v1/some-endpoint'; // Replace with the actual endpoint

    try {
        const response = await fetch(url, {
            method: 'GET', // or 'POST' if needed
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers you need
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        dataJSON = JSON.stringify(data);

        return dataJSON; // Return the data to be used in the frontend

        // Process the data as needed
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch data
fetchDataFromGeminiAI();