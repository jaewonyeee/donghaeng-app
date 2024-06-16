const jsonServer = require('json-server');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../db/reviewdb.json'));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

server.post('/upload', upload.array('files'), (req, res) => {
  if (!req.files) {
    return res.status(400).json({ error: 'No files were uploaded.' });
  }
  const filePaths = req.files.map(file => `/uploads/${file.filename}`);
  res.status(200).json({ filePaths });
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
