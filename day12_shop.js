// Function to extract product data from all product cards and format as CSV https://shop.app/search/results?query=dog+toys&inStock=false&ratings=4
function extractAllProductDataToCSV() {
    // Select all the product card div elements
    const productCards = document.querySelectorAll('div[data-testid="product-card"]');
    
    // Array to hold all product data in CSV format
    const csvRows = [];
    
    // Add headers to the CSV
    csvRows.push(["productName", "imageUrl", "productUrl", "price", "rating", "reviews"].join(","));
    
    // Loop through each product card and extract data
    productCards.forEach((productCard) => {
      // Extract the product name
      const productName = productCard.querySelector('a[data-testid="product-link-test-id"] > p:nth-child(2)').textContent.trim();
      
      // Extract the image URL
      const imageUrl = productCard.querySelector('img[data-testid="image"]').src;
      
      // Extract the product link URL
      const productUrl = productCard.querySelector('a[data-testid="product-link-test-id"]').href;
      
      // Extract the price
      const price = productCard.querySelector('span[data-testid="regularPrice"]').textContent.trim();
      
      // Extract the rating
      const rating = productCard.querySelector('div[aria-label]').getAttribute('aria-label').split('based on')[0].replace('Average rating:', '').trim();
      
      // Extract the number of reviews
      const reviews = productCard.querySelector('p.font-caption.text-caption.ml-space-4').textContent.trim();
      
      // Push the extracted data into the CSV array
      const row = [productName, imageUrl, productUrl, price, rating, reviews].join(",");
      csvRows.push(row);
    });
    
    // Convert the array to a CSV string
    const csvString = csvRows.join("\n");
    
    // Create a downloadable CSV file
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "products.csv");
    a.click();
  }
  
  // Call the function to extract data and download the CSV
  extractAllProductDataToCSV();
  