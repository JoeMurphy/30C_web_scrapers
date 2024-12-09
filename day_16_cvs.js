(function () {
    // Function to convert data to CSV
    function generateCSV(data) {
      const csvRows = [];
      const headers = Object.keys(data[0]);
      csvRows.push(headers.join(',')); // Add headers to CSV
  
      data.forEach((row) => {
        const values = headers.map((header) => {
          const escapedValue = ('' + row[header]).replace(/"/g, '""'); // Escape quotes
          return `"${escapedValue}"`;
        });
        csvRows.push(values.join(','));
      });
  
      return csvRows.join('\n');
    }
  
    // Function to download CSV file
    function downloadCSV(csv, filename) {
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', filename);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  
    // Select all product containers
    const productContainers = document.querySelectorAll(
      'div.css-1dbjc4n.r-18u37iz.r-tzz3ar'
    );
  
    const products = [];
  
    productContainers.forEach((container) => {
      try {
        const product = {};
  
        // Extract product name
        const nameElement = container.querySelector(
          'section[id] div[dir="auto"]'
        );
        product.name = nameElement ? nameElement.innerText : null;
  
        // Extract product link
        const linkElement = container.querySelector('a[role="link"]');
        product.link = linkElement ? linkElement.href : null;
  
        // Extract brand name
        const brandElement = container.querySelector(
          'a.plp-tile-brand-link div[dir="auto"]'
        );
        product.brand = brandElement ? brandElement.innerText : null;
  
        // Extract image URL
        const imageElement = container.querySelector('img.PLP-tile-image');
        product.imageUrl = imageElement ? imageElement.src : null;
  
        // Extract review count
        const reviewCountElement = container.querySelector(
          'a[aria-label*="reviews"] div[dir="auto"]'
        );
        product.reviewsCount = reviewCountElement
          ? parseInt(reviewCountElement.innerText.replace(/[^0-9]/g, ''), 10)
          : 0;
  
        // Extract price range
        const priceElement = container.querySelector(
          'div.productTile-renderPrice-container div[aria-label], div[aria-label*="price"]'
        );
        product.price = priceElement ? priceElement.textContent.trim() : null;
  
        // Extract availability status
        const availabilityElement = container.querySelector(
          'div.fulfillmentBadge-container div[dir="auto"]'
        );
        product.availability = availabilityElement
          ? availabilityElement.innerText.trim()
          : null;
  
        // Add the product to the products array
        products.push(product);
      } catch (err) {
        console.error('Error extracting product data:', err);
      }
    });
  
    // If products were found, generate and download the CSV
    if (products.length > 0) {
      const csv = generateCSV(products);
      downloadCSV(csv, 'product_data.csv');
      console.log('CSV file generated and downloaded!');
    } else {
      console.log('No product data found.');
    }
  })();
  