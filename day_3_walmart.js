// Create an empty array to store extracted data
let extractedData = [];

// Select all elements that match the given class
let elements = document.querySelectorAll('.mb0.ph0-xl.pt0-xl.bb.b--near-white.w-25.pb3-m.ph1');

elements.forEach((element) => {
  // Extract the data for each element
  let dataItem = {};

  // Extract the product title
  let titleElement = element.querySelector('span[data-automation-id="product-title"]');
  dataItem.title = titleElement ? titleElement.innerText.trim() : '';

  // Extract the price
  let priceElement = element.querySelector('div[data-automation-id="product-price"] span.f2');
  let priceFractionElement = element.querySelector('div[data-automation-id="product-price"] span.f6');
  dataItem.price = priceElement && priceFractionElement ? `${priceElement.innerText.trim()}.${priceFractionElement.innerText.trim()}` : '';

  // Extract the image source URL
  let imageElement = element.querySelector('img[data-testid="productTileImage"]');
  dataItem.imageUrl = imageElement ? imageElement.src : '';

  // Extract the ratings
  let ratingElement = element.querySelector('span[data-testid="product-ratings"]');
  dataItem.rating = ratingElement ? ratingElement.getAttribute('data-value') : '';

  // Extract the number of reviews
  let reviewsElement = element.querySelector('span[data-testid="product-reviews"]');
  dataItem.reviews = reviewsElement ? reviewsElement.getAttribute('data-value') : '';

  // Extract the product link
  let linkElement = element.querySelector('a.w-100.h-100');
  dataItem.link = linkElement ? linkElement.href : '';

  // Add the extracted data to the array
  extractedData.push(dataItem);
});

// Convert the extracted data to a CSV format
function convertToCSV(array) {
  const headers = Object.keys(array[0]).join(','); // Get the headers
  const rows = array.map(obj => Object.values(obj).map(value => `"${value}"`).join(',')); // Convert each row to CSV format
  return [headers, ...rows].join('\n'); // Join headers and rows with new line
}

// Trigger download of CSV file
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

// Convert the extracted data to CSV and download it
let csvData = convertToCSV(extractedData);
downloadCSV(csvData, 'extracted_wmt_data.csv');