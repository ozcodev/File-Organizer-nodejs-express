const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileType = getFileType(file.originalname);
    const destinationPath = path.join(__dirname, 'uploads', fileType);
    fs.mkdirSync(destinationPath, { recursive: true });
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Get the file type based on extension
function getFileType(filename) {
  const extension = path.extname(filename).toLowerCase();
  switch (extension) {
    case '.jpg':
    case '.jpeg':
    case '.png':
      return 'images';
    case '.pdf':
    case '.doc':
    case '.docx':
      return 'documents';
    case '.mp4':
      return 'video';
    case '.mp3':
    case '.wav':
      return 'audio';
    default:
      return 'others';
  }
}

// Express route for file upload
app.post('/upload', upload.array('files'), (req, res) => {
  res.json({ message: 'Files uploaded successfully!' });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
