// Function to extract data from the current page
function extractOffersFromPage() {
    let offers = [];
    document.querySelectorAll('.item-offer-card').forEach(card => {
      let image = card.querySelector('.item-offer-card__image img')?.src || 'No image found';
      let cashback = card.querySelector('.item-offer-card__text--cash-back')?.innerText.trim() || 'No cashback found';
      let offerName = card.querySelector('.item-offer-card__text--offer-name')?.innerText.trim() || 'No offer name found';
      let link = card.querySelector('a')?.href || 'No link found';
  
      offers.push({
        image: image,
        cashback: cashback,
        offerName: offerName,
        link: link
      });
    });
    return offers;
  }
  
  // Function to navigate to the next page
  function goToNextPage() {
    let nextButton = document.querySelector('.page-control.control-arrow:not(.arrow-disabled)');
    if (nextButton) {
      nextButton.click();
      return true;
    }
    return false;
  }
  
  // Function to convert JSON data to CSV
  function convertToCSV(data) {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
  
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        return `"${value}"`;
      });
      csvRows.push(values.join(','));
    }
  
    return csvRows.join('\n');
  }
  
  // Function to download the CSV file
  function downloadCSV(data, filename = 'offers.csv') {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  // Function to extract data from the first 5 pages
  async function extractFirstFivePages() {
    let allOffers = [];
    let currentPage = 1;
    const maxPages = 5;
  
    while (currentPage <= maxPages) {
      console.log(`Extracting data from page ${currentPage}...`);
      // Wait for content to load
      await new Promise(resolve => setTimeout(resolve, 2000));
  
      // Extract data from the current page
      let offersFromPage = extractOffersFromPage();
      allOffers = allOffers.concat(offersFromPage);
      console.log(`Page ${currentPage} extracted. Number of offers so far: ${allOffers.length}`);
  
      currentPage++;
      // Navigate to the next page if not on the last page
      if (currentPage <= maxPages && !goToNextPage()) {
        console.log('No more pages available.');
        break;
      }
    }
  
    console.log('Extraction completed for the first 5 pages!');
    console.log(allOffers);
  
    // Download the extracted data as CSV
    downloadCSV(allOffers);
  }
  
  // Run the extraction function for the first 5 pages
  extractFirstFivePages();