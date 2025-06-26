
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const piexif = require('piexifjs');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/convert', upload.array('images'), async (req, res) => {
  try {
    const convertedImages = [];
    const exifData = req.body.exifData ? JSON.parse(req.body.exifData) : {};

    for (const file of req.files) {
      const originalBuffer = file.buffer;
      let webpBuffer;

      if (exifData && (exifData.artist || exifData.copyright || exifData.userComment)) {
        const zeroth = {};
        const exif = {};
        const gps = {};

        if (exifData.artist) {
            zeroth[piexif.ImageIFD.Artist] = exifData.artist;
        }
        if (exifData.copyright) {
            zeroth[piexif.ImageIFD.Copyright] = exifData.copyright;
        }
        if (exifData.userComment) {
            const comment = piexif.helper.UserComment.encode(exifData.userComment);
            exif[piexif.ExifIFD.UserComment] = comment;
        }

        const exifObj = {"0th": zeroth, "Exif": exif, "GPS": gps};
        // piexif.dump() returns a string starting with "Exif\0\0" which sharp seems to add itself.
        // We slice off this 6-byte header to provide only the TIFF data.
        const exifBytesString = piexif.dump(exifObj).slice(6);
        const exifBuffer = Buffer.from(exifBytesString, "binary");

        webpBuffer = await sharp(originalBuffer)
          .webp()
          .withMetadata({ exif: exifBuffer })
          .toBuffer();
      } else {
        webpBuffer = await sharp(originalBuffer)
          .webp()
          .toBuffer();
      }

      convertedImages.push({
        originalName: file.originalname,
        buffer: webpBuffer.toString('base64'),
      });
    }

    res.json(convertedImages);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error converting images');
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
