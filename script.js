// script.js
document.getElementById('excel-file').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    // Assuming the first sheet contains the data
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert worksheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Render the data as a table
    renderTable(jsonData);
  };

  reader.readAsArrayBuffer(file);
});

function renderTable(data) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = ''; // Clear previous content

  if (data.length === 0) {
    outputDiv.textContent = 'No data found in the uploaded file.';
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
