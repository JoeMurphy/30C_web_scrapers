// how to https://www.loom.com/share/0a7be9f5206d4588b1187f545ffe80fc
// Initialize an empty array to hold the extracted data

const channelData = [];

// Iterate over each channel element and extract the necessary data
channelElements.forEach(channelElement => {
  // Extract the channel URL
  const channelURL = channelElement.href;

  // Extract the channel image source
  const channelImage = channelElement.querySelector('img.tp-list-channel-image')?.src;

  // Extract the channel name
  const channelName = channelElement.querySelector('p.vs-item-channel-name')?.innerText;

  // Extract the channel ID (handle)
  const channelID = channelElement.querySelector('p.vs-item-channel-id')?.innerText;

  // Extract the subscriber count
  const subscriberCount = channelElement.querySelectorAll('div.item')[1]?.innerText;

  // Extract the view count
  const viewCount = channelElement.querySelectorAll('div.item.desktop-item')[0]?.innerText;

  // Extract the video count
  const videoCount = channelElement.querySelectorAll('div.item.desktop-item')[1]?.innerText;

  // Extract the score
  const score = channelElement.querySelector('div.vs-score')?.innerText;

  // Store the extracted data in an array
  channelData.push([
    channelURL,
    channelImage,
    channelName,
    channelID,
    subscriberCount,
    viewCount,
    videoCount,
    score
  ]);
});

// Create CSV content
let csvContent = 'Channel URL,Channel Image,Channel Name,Channel ID,Subscriber Count,View Count,Video Count,Score\n';

// Append each row of channel data to the CSV content
channelData.forEach(row => {
  csvContent += row.join(',') + '\n';
});

// Create a Blob from the CSV content
const csvBlob = new Blob([csvContent], { type: 'text/csv' });

// Create a link element to download the CSV file
const downloadLink = document.createElement('a');
downloadLink.href = URL.createObjectURL(csvBlob);
downloadLink.download = 'channel_data.csv';

// Append the link to the document and trigger a click to download the file
document.body.appendChild(downloadLink);
downloadLink.click();

// Remove the link from the document after downloading
document.body.removeChild(downloadLink);
