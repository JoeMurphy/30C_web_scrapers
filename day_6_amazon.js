// Function to extract data from each product listing on the page
function extractProductDataToCSV() {
    // Get all elements with the 'data-component-type' attribute set to 's-search-result'
    const productElements = document.querySelectorAll('[data-component-type="s-search-result"]');
  
    // Create an array to store the extracted product data
    let products = [];
  
    // Loop through each product element
    productElements.forEach((element) => {
      // Extract the ASIN (Amazon Standard Identification Number)
      const asin = element.getAttribute('data-asin');
  
      // Extract product name
      const titleElement = element.querySelector('h2 span.a-text-normal');
      const productName = titleElement ? titleElement.textContent.trim() : null;
  
      // Extract product link
      const linkElement = element.querySelector('h2 a.a-link-normal');
      const productLink = linkElement ? linkElement.href : null;
  
      // Extract product price
      const priceElement = element.querySelector('.a-price > .a-offscreen');
      const productPrice = priceElement ? priceElement.textContent.trim() : null;
  
      // Extract product ratings
      const ratingElement = element.querySelector('.a-icon-alt');
      const productRating = ratingElement ? ratingElement.textContent.trim() : null;
  
      // Extract total number of ratings
      const ratingCountElement = element.querySelector('.a-link-normal .s-underline-text');
      const totalRatings = ratingCountElement ? ratingCountElement.textContent.trim() : null;
  
      // Extract product image URL
      const imageElement = element.querySelector('.s-image');
      const productImage = imageElement ? imageElement.src : null;
  
      // Extract availability (Prime shipping or delivery date)
      const availabilityElement = element.querySelector('.s-align-children-center .a-color-base.a-text-bold');
      const availability = availabilityElement ? availabilityElement.textContent.trim() : null;
  
      // Extract seller rating, if available
      const sellerRatingElement = element.querySelector('[aria-label^="The seller rating is"]');
      const sellerRating = sellerRatingElement ? sellerRatingElement.textContent.trim() : null;
  
      // Store the extracted product data in an object
      const productData = {
        ASIN: asin,
        ProductName: productName,
        ProductLink: productLink,
        ProductPrice: productPrice,
        ProductRating: productRating,
        TotalRatings: totalRatings,
        ProductImage: productImage,
        Availability: availability,
        SellerRating: sellerRating,
      };
  
      // Add the product data object to the products array
      products.push(productData);
    });
  
    // Convert products array to CSV format
    const headers = Object.keys(products[0]);
    const csvRows = [headers.join(',')];
  
    products.forEach((product) => {
      const row = headers.map((header) => `"${product[header] || ''}"`).join(',');
      csvRows.push(row);
    });
  
    // Create CSV file content
    const csvContent = csvRows.join('\n');
  
    // Create a Blob object from CSV content and generate a download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
  
    // Set the download file name and link URL
    downloadLink.href = url;
    downloadLink.download = 'product_data.csv';
  
    // Programmatically click the download link to trigger download
    downloadLink.click();
  
    // Cleanup the object URL
    URL.revokeObjectURL(url);
  }
  
  // Call the function to extract product data and generate a CSV file
  extractProductDataToCSV();
  