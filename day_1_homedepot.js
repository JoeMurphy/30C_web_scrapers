// Function to extract product details and download as CSV
function extractProductInfo() {
    // Select all product elements on the page
    const products = document.querySelectorAll('[data-testid="product-pod"]');

    // Array to store product information
    let productInfo = [];

    products.forEach((product) => {
        // Extract product details with fallback for missing fields
        const label = product.querySelector('.sui-text-ellipsis')?.textContent.trim() || '';
        const productLink = product.querySelector('a')?.href || '';
        const mainImageURL = product.querySelector('img')?.src || '';
        const alternateImageURL = product.querySelectorAll('img')[1]?.src || '';
        const productName = product.querySelector('h3 span')?.textContent.trim() || '';
        const brandName = product.querySelector('p[data-testid="attribute-brandname-above"]')?.textContent.trim() || '';
        const modelNumber = product.querySelector('div[data-testid="pod-spacer"]')?.textContent.trim() || '';
        const currentPrice = product.querySelector('#was-price .sui-text-4xl')?.textContent.trim() || '';
        const previousPrice = product.querySelector('#was-price .sui-line-through span')?.textContent.trim() || '';
        const savings = product.querySelector('#was-price .sui-text-success span')?.textContent.trim() || '';
        const rating = product.querySelector('[role="img"][aria-label]')?.ariaLabel || '';
        const numberOfReviews = product.querySelector('.sui-text-primary')?.textContent.replace(/[()]/g, '') || '';
        const fulfillmentOptions = Array.from(product.querySelectorAll('.store__text-box div')).map(el => el.textContent.trim()).join('; ') || '';

        // Add extracted details to productInfo array
        productInfo.push({
            label,
            productLink,
            mainImageURL,
            alternateImageURL,
            productName,
            brandName,
            modelNumber,
            currentPrice,
            previousPrice,
            savings,
            rating,
            numberOfReviews,
            fulfillmentOptions,
        });
    });

// Convert array to CSV format
const csvContent = [
    ['Label', 'Product Link', 'Main Image URL', 'Alternate Image URL', 'Product Name', 'Brand Name', 'Model Number', 'Current Price', 'Previous Price', 'Savings', 'Rating', 'Number of Reviews', 'Fulfillment Options'],
    ...productInfo.map(row => Object.values(row))
].map(e => e.join(',')).join('\n');

// Create a downloadable CSV file
const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.setAttribute('href', url);
link.setAttribute('download', 'product_info.csv');
link.style.visibility = 'hidden';
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
}
