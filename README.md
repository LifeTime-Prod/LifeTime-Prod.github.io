Read this GOogle SHeet db lets go!

https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server


https://developers.google.com/sheets/api/guides/values#javascript_2


https://stackoverflow.com/questions/19887737/pushing-data-to-google-spreadsheet-through-javascript-running-in-browser

Is ther any way to be able to write database or json or any form of data in github pages even exterior methods
Yes, you can use GitHub Pages to host JSON data, but it's important to note that GitHub Pages is designed for static content, so you won't be able to directly interact with a database. However, you can still use some workarounds to achieve your goal1.

Here are a few methods:

Static JSON Files: You can host static JSON files on GitHub Pages. You can create a JSON file and push it to your repository2. Then, you can access this file via its URL. For example, if your JSON file is named data.json and it's in the root of your repository, you can access it at https://username.github.io/data.json.

JavaScript: You can use JavaScript to fetch and manipulate JSON data on the client side. For example, you can use the fetch API to retrieve the JSON file and display its contents on your webpage.

GitHub Actions: You can use GitHub Actions to automate tasks, such as updating your JSON file when you push changes to your repository. This way, you can keep your JSON data up-to-date without manual intervention1.

Third-Party Services: If you need more dynamic capabilities, you might consider using a third-party service like Netlify or Vercel, which support server-side code and databases.

Would you like more details on any of these methods?




Rather than just reading data I also need a way to write them or Post them
Understood! If you need to write or post data, using GitHub Pages alone isn't sufficient as it only serves static content. However, you can achieve this functionality by combining GitHub Pages with other services:

Using a Third-Party Backend Service:

You can use services like Firebase, AWS Lambda, or any other serverless platform to handle data writing operations. Your GitHub Pages site can interact with these services via API calls.

Using GitHub Issues/Discussions as a Database:

You can write data by creating issues or discussions in your GitHub repository. This way, you can store data directly on GitHub, and use GitHub's API to interact with it.

Integrating with Google Sheets:

You can use Google Sheets as a makeshift database by using the Google Sheets API. Your GitHub Pages site can read from and write to Google Sheets.

Using GitHub Actions for Dynamic Data:

You can set up GitHub Actions to run on specific events (e.g., HTTP requests) and update your JSON files accordingly. This method still has limitations but could be useful for some scenarios.

Would you like a more detailed guide on setting up one of these methods?
