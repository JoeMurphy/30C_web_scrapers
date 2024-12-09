// Function to scrape listings on the current page
function scrapeListings() {
    const listings = document.querySelectorAll('div.StyledCard-c11n-8-105-0__sc-1w6p0lv-0');
    
    const properties = Array.from(listings).map(listing => {
        const address = listing.querySelector('address')?.innerText || "No address found";
        const price = listing.querySelector('[data-test="property-card-price"]')?.innerText || "No price found";
        const detailsList = listing.querySelectorAll('ul.StyledPropertyCardHomeDetailsList-c11n-8-105-0__sc-1j0som5-0 li');
        const beds = detailsList.length > 0 ? detailsList[0]?.innerText || "No beds info" : "No beds info";
        const baths = detailsList.length > 1 ? detailsList[1]?.innerText || "No baths info" : "No baths info";
        const sqft = detailsList.length > 2 ? detailsList[2]?.innerText || "No sqft info" : "No sqft info";
        const url = listing.querySelector('a.property-card-link')?.href || "No URL found";
    
        return {
            address,
            price,
            beds,
            baths,
            sqft,
            url
        };
    });
    
    return properties;
}

// Function to go to the next page
async function goToNextPage() {
    const nextPageLink = document.querySelector('.PaginationJumpItem-c11n-8-105-0__sc-h97wcm-0 a[rel="next"]');
    if (nextPageLink) {
        nextPageLink.click();
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds for the page to load
        return true; // Indicate that there is a next page
    }
    return false; // No next page
}

// Function to collect listings across 5 pages
async function scrapeFirstFivePages() {
    let allProperties = [];
    let pageCount = 0;
    let hasNextPage = true;

    while (pageCount < 5 && hasNextPage) {
        const properties = scrapeListings();
        allProperties = allProperties.concat(properties);
        console.log(`Scraped ${properties.length} listings on page ${pageCount + 1}.`);

        hasNextPage = await goToNextPage();
        pageCount++;
    }

    console.log(`Total scraped listings from first ${pageCount} pages: ${allProperties.length}`);
    console.log(allProperties);

    // Optionally, copy the results to your clipboard
    copy(allProperties);
}

// Start scraping the first 5 pages
scrapeFirstFivePages();
