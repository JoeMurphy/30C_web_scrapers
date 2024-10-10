// Function to extract data from each card and download as CSV
function extractCardDataToCSV() {
    // Select all elements with the class name `CommonGridLayoutDataList_cardWrapper__jkA9g`
    const cardElements = document.querySelectorAll('.CommonGridLayoutDataList_cardWrapper__jkA9g');
  
    // Map through each element and extract relevant data
    const cardData = Array.from(cardElements).map((card) => {
      // Extract the background image URL
      const backgroundImageStyle = card.querySelector('.TopadsVideoCard_cardVideo__zBJH_')?.style?.backgroundImage;
      const imageURL = backgroundImageStyle
        ? backgroundImageStyle.replace(/url\("(.+)"\)/, '$1')
        : '';
  
      // Extract the title elements
      const titles = Array.from(card.querySelectorAll('.TopadsVideoCard_title__UeLe1')).map((title) => title.textContent.trim()).join(' - ');
  
      // Extract the likes and CTR
      const likes = card.querySelector('.TopadsVideoCard_itemValue__0N0xu')?.textContent.trim() || '';
      const ctr = Array.from(card.querySelectorAll('.TopadsVideoCard_cardInfoItem__vjGkP'))
        .find((item) => item.textContent.includes('CTR'))?.querySelector('.TopadsVideoCard_itemValue__0N0xu')?.textContent.trim() || '';
  
      // Extract the link to 'See analytics'
      const analyticsLink = card.querySelector('a')?.href || '';
  
      // Return the collected data as an object
      return {
        imageURL,
        titles,
        likes,
        ctr,
        analyticsLink
      };
    });
  
    // Create CSV header
    const csvHeader = ['Image URL', 'Titles', 'Likes', 'CTR', 'Analytics Link'];
    
    // Map the data to CSV format
    const csvContent = [
      csvHeader.join(','), // Join the headers
      ...cardData.map(row => 
        [row.imageURL, row.titles, row.likes, row.ctr, row.analyticsLink].map(value => `"${value}"`).join(',')
      )
    ].join('\n');
  
    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
  
    // Create a temporary link to download the CSV file
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'card_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  // Run the function to extract data and download CSV
  extractCardDataToCSV();
  