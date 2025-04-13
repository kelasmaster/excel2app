// script.js

document.addEventListener('DOMContentLoaded', function () {
  // Path to the existing Excel file
  const filePath = 'data/example.xlsx';

  // Fetch the file
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error loading file: ${response.statusText}`);
      }
      return response.arrayBuffer();
    })
    .then(data => {
      // Parse the Excel file using SheetJS
      const workbook = XLSX.read(data, { type: 'array' });

      // Assuming the first sheet contains the data
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert worksheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Render the data as a table
      renderTable(jsonData);
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('output').textContent = 'Failed to load data.';
    });
});

function renderTable(data) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = ''; // Clear previous content

  if (data.length === 0) {
    outputDiv.textContent = 'No data found in the file.';
    return;
  }

  const table = document.createElement('table');

  // Create table rows
  data.forEach(rowData => {
    const row = document.createElement('tr');
    rowData.forEach(cellData => {
      const cell = document.createElement('td');
      cell.textContent = cellData;
      row.appendChild(cell);
    });
    table.appendChild(row);
  });

  outputDiv.appendChild(table);
}
