// Function to convert an array of objects to CSV
function arrayToCSV(arr) {
    const csvRows = [];
    
    // Get the headers
    const headers = Object.keys(arr[0]);
    csvRows.push(headers.join(','));
    
    // Loop over the rows
    for (const row of arr) {
        const values = headers.map(header => {
            const escaped = ('' + row[header]).replace(/"/g, '\\"'); // Escape quotes
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
}

// Function to extract product data from a single product tile
function extractProductData(productElement) {
    const productId = productElement.querySelector('input[type="checkbox"]') ? productElement.querySelector('input[type="checkbox"]').value : 'N/A';
    const productBrand = productElement.querySelector('.js-save-to-list') ? productElement.querySelector('.js-save-to-list').getAttribute('data-brand') : 'N/A';
    const productDescription = productElement.querySelector('.js-save-to-list') ? productElement.querySelector('.js-save-to-list').getAttribute('data-description') : 'N/A';
    const productPrice = productElement.querySelector('.prdt-actl-pr') ? productElement.querySelector('.prdt-actl-pr').innerText.trim() : 'N/A';
    const productRating = productElement.querySelector('[aria-label*="Stars"]') ? productElement.querySelector('[aria-label*="Stars"]').getAttribute('aria-label') : 'N/A';
    const productImage = productElement.querySelector('img.js-pl-lazy-load-image') ? productElement.querySelector('img.js-pl-lazy-load-image').src : 'N/A';
    const productSpecs = Array.from(productElement.querySelectorAll('.product-market-bullets-value')).map(spec => spec.innerText.trim()).join('; ') || 'N/A';
    const deliveryInfo = productElement.querySelector('.delivery-zipcode-link .label span') ? productElement.querySelector('.delivery-zipcode-link .label span').innerText.trim() : 'N/A';
    const pickupInfo = productElement.querySelector('.pickup-message div') ? productElement.querySelector('.pickup-message div').innerText.trim() : 'N/A';

    return {
        productId,
        brand: productBrand,
        description: productDescription,
        price: productPrice,
        rating: productRating,
        image: productImage,
        specs: productSpecs,
        delivery: deliveryInfo,
        pickup: pickupInfo
    };
}

// Get all product elements on the page
const productElements = document.querySelectorAll('div[data-row]');

// Extract data from all product elements
const productsData = Array.from(productElements).map(extractProductData);

// Convert the extracted data to CSV
const csvData = arrayToCSV(productsData);

// Log the CSV to console (or copy it to clipboard for easy use)
console.log(csvData);
navigator.clipboard.writeText(csvData).then(() => {
    console.log('CSV data copied to clipboard');
}).catch(err => {
    console.error('Could not copy text: ', err);
});
