// Select all product elements
const productElements = document.querySelectorAll('li .sc-pc-medium-desktop-card-canary');

// Extract data from each product element
const products = Array.from(productElements).map(product => {
    const titleElement = product.querySelector('.sc-pc-title-medium h3');
    const priceElement = product.querySelector('.Price-group');
    const ratingElement = product.querySelector('.bst-rating');
    const imageElement = product.querySelector('img');
    const linkElement = product.querySelector('a');

    return {
        title: titleElement ? titleElement.textContent.trim() : '',
        price: priceElement ? priceElement.getAttribute('title').replace('current price: ', '').trim() : '',
        rating: ratingElement ? ratingElement.getAttribute('aria-label') : '',
        image: imageElement ? imageElement.src : '',
        link: linkElement ? linkElement.href : ''
    };
});

// Convert the data to CSV format
const headers = ['Title', 'Price', 'Rating', 'Image URL', 'Link'];
const rows = products.map(product =>
    [product.title, product.price, product.rating, product.image, product.link].map(value => `"${value}"`).join(',')
);
const csvContent = [headers.join(','), ...rows].join('\n');

// Create a downloadable link for the CSV
const blob = new Blob([csvContent], { type: 'text/csv' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'products.csv';
a.style.display = 'none';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
URL.revokeObjectURL(url);

console.log('CSV file downloaded!');
