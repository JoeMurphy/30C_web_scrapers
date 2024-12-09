async function scrollToBottom() {
    const distance = 500; // Pixels to scroll each step
    const delay = 200; // Delay between scrolls
  
    while (document.documentElement.scrollHeight - window.innerHeight > window.scrollY) {
      window.scrollBy(0, distance);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  async function extractPropertyData() {
    await scrollToBottom(); // Scroll to the bottom
  
    // Select all property cards
    const propertyCards = document.querySelectorAll('.BasePropertyCard_propertyCardWrap__Z5y4p');
  
    let allProperties = [];
  
    propertyCards.forEach(card => {
      const title = card.querySelector('[data-testid="broker-title"]')?.innerText?.trim() || 'N/A';
      const price = card.querySelector('[data-testid="card-price"] .base__StyledType-rui__sc-108xfm0-0')?.innerText?.trim() || 'N/A';
      const address1 = card.querySelector('[data-testid="card-address-1"]')?.innerText?.trim() || 'N/A';
      const address2 = card.querySelector('[data-testid="card-address-2"]')?.innerText?.trim() || 'N/A';
      const beds = card.querySelector('[data-testid="property-meta-beds"] [data-testid="meta-value"]')?.innerText?.trim() || 'N/A';
      const baths = card.querySelector('[data-testid="property-meta-baths"] [data-testid="meta-value"]')?.innerText?.trim() || 'N/A';
      const sqft = card.querySelector('[data-testid="property-meta-sqft"] [data-testid="meta-value"]')?.innerText?.trim() || 'N/A';
      const lotSize = card.querySelector('[data-testid="property-meta-lot-size"] [data-testid="meta-value"]')?.innerText?.trim() || 'N/A';
      const imageUrl = card.querySelector('[data-testid="picture-img"]')?.src || 'N/A';
  
      // Collect the extracted data into an object
      const propertyData = {
        title,
        price,
        address: `${address1}, ${address2}`,
        beds,
        baths,
        sqft,
        lotSize,
        imageUrl
      };
  
      // Add the extracted property data to the array
      allProperties.push(propertyData);
    });
  
    // Display the extracted results
    console.log('Extracted Property Data:', allProperties);
  
    // Optionally: Copy results to clipboard
    copy(allProperties);
  }
  
  // Run the extraction function
  extractPropertyData();
  