// Select all rows in the table https://nrf.com/research-insights/top-retailers/top-100-retailers/top-100-retailers-2024-list
const rows = document.querySelectorAll('tr');

// Initialize an array to store extracted data
const tableData = [];

// Loop through each row
rows.forEach(row => {
    // Check if it's a primary row or a nested row
    if (row.classList.contains('odd')) {
        // Object to store data for the primary row
        const primaryRowData = {};

        // Extract data from main cells (td elements)
        const cells = row.querySelectorAll('td');
        primaryRowData['ID'] = cells[0]?.textContent.trim();
        primaryRowData['Name'] = cells[1]?.textContent.trim();
        primaryRowData['Value'] = cells[2]?.textContent.trim();
        
        // Find the next sibling row, which should be the nested row
        let nestedRow = row.nextElementSibling;
        if (nestedRow && nestedRow.querySelector('.child-row-wrapper')) {
            // Extract nested data from divs with .label and .value classes
            const labels = nestedRow.querySelectorAll('.label');
            const values = nestedRow.querySelectorAll('.value');

            labels.forEach((label, index) => {
                const labelText = label.textContent.trim();
                const valueText = values[index]?.textContent.trim();
                primaryRowData[labelText] = valueText;
            });
        }

        // Add the primary row with nested data to tableData array
        tableData.push(primaryRowData);
    }
});

// Convert data to CSV format
const headers = [...new Set(tableData.flatMap(row => Object.keys(row)))];
const csvContent = [
    headers.join(','), // Add headers
    ...tableData.map(row => headers.map(header => JSON.stringify(row[header] || "")).join(',')) // Add rows
].join('\n');

// Create a blob from the CSV content
const blob = new Blob([csvContent], { type: 'text/csv' });

// Create a download link
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'tableData.csv';

// Append link to the body, trigger the download, and then remove the link
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
