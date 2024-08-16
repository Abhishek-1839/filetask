const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 9985;

const folderPath = path.join(__dirname, 'textfiles');

// Ensure the folder exists
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

// Endpoint to create a text file with the current timestamp
app.post('/create-file', (req, res) => {
    try {
        console.log('POST /create-file route hit');
  const currentDateTime = new Date().toISOString().replace(/:/g, '-');
  const fileName = `${currentDateTime}.txt`;
  const filePath = path.join(folderPath, fileName);
  const content = `Timestamp: ${new Date().toISOString()}`;

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error writing file', error: err });
    }
    res.status(200).json({ message: 'File created successfully', fileName });
  });
}
catch (error) {
    console.error('Unexpected error:', error); // Catch any unexpected errors
    res.status(500).json({ message: 'An unexpected error occurred', error });
  }

});

// Endpoint to retrieve all text files in the folder
app.get('/get-files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading directory', error: err });
    }
    const textFiles = files.filter(file => path.extname(file) === '.txt');
    res.status(200).json({ files: textFiles });
  });
});
app.get('/a', (req, res) => {
    console.log('GET / route hit');
    res.send('Server is running');
  });
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
