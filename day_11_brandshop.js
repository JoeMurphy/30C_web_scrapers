// Select all div elements that have the class you specified from https://www.walmart.com/brand/branddirectory
let elements = document.querySelectorAll('div.w_aoqv.w_wRee.w_EP2w.w_eLjl.w_jCHO');

// Create an array to store the extracted data
let extractedData = [];

// Loop through each matching element
elements.forEach((element) => {
    // Find the anchor tag within the div
    let anchor = element.querySelector('a.black.f5.ttc.mb2');
    
    if (anchor) {
        // Extract the brand name and link
        let brandName = anchor.textContent.trim();
        let link = anchor.href;
        
        // Add the data to the array
        extractedData.push({ brandName, link });
    }
});

// Convert the extracted data to CSV format
let csvContent = "data:text/csv;charset=utf-8,Brand Name,Link\n" + 
    extractedData.map(e => `${e.brandName},${e.link}`).join("\n");

// Create a hidden link element to trigger the download
let encodedUri = encodeURI(csvContent);
let link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "extracted_data.csv");

// Append the link to the body and trigger the download
document.body.appendChild(link);
link.click();
document.body.removeChild(link);