// before running script make sure you show all connections 
// Select all the connection cards on the page
let connectionCards = document.querySelectorAll('.mn-connection-card');

// Initialize an array to store the extracted data
let extractedData = [];

// Loop through each connection card and extract data
connectionCards.forEach(card => {
  // Extract the profile link
  let profileLink = card.querySelector('a.mn-connection-card__link') ? card.querySelector('a.mn-connection-card__link').href : '';

  // Extract the name
  let name = card.querySelector('.mn-connection-card__name') ? card.querySelector('.mn-connection-card__name').innerText.trim() : '';

  // Extract the occupation
  let occupation = card.querySelector('.mn-connection-card__occupation') ? card.querySelector('.mn-connection-card__occupation').innerText.trim() : '';

  // Extract the time since connected
  let connectionTime = card.querySelector('time.time-badge') ? card.querySelector('time.time-badge').innerText.trim() : '';

  // Extract the profile image URL
  let profileImageUrl = card.querySelector('img.presence-entity__image') ? card.querySelector('img.presence-entity__image').src : '';

  // Push the data into the array
  extractedData.push({
    profileLink,
    name,
    occupation,
    connectionTime,
    profileImageUrl
  });
});

// Function to convert JSON to CSV format
function convertToCSV(data) {
  const csvRows = [];
  
  // Add the headers
  csvRows.push('Name,Occupation,Connection Time,Profile Link,Profile Image URL');

  // Loop over each object and format the CSV rows
  data.forEach(row => {
    csvRows.push(`"${row.name}","${row.occupation}","${row.connectionTime}","${row.profileLink}","${row.profileImageUrl}"`);
  });

  return csvRows.join('\n');
}

// Convert the extracted data to CSV
let csvData = convertToCSV(extractedData);

// Function to trigger a download of the CSV file
function downloadCSV(csv, filename) {
  let csvFile = new Blob([csv], { type: 'text/csv' });
  let downloadLink = document.createElement('a');
  
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = 'none';
  
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// Download the CSV file
downloadCSV(csvData, 'linkedin_connections.csv');
