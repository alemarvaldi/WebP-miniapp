import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [exifData, setExifData] = useState({
    artist: '',
    copyright: '',
    userComment: '',
  });
  const [convertedImages, setConvertedImages] = useState([]);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleExifChange = (event) => {
    setExifData({
      ...exifData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    setProcessing(true);
    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });

    formData.append('exifData', JSON.stringify(exifData));

    try {
      const response = await axios.post('http://localhost:3001/api/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setConvertedImages(response.data);
    } catch (error) {
      console.error('Error converting images:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="App">
      <h1>Image to WebP Converter</h1>

      <div className="input-section">
        <input type="file" accept=".jpeg,.jpg,.png" multiple onChange={handleFileChange} />
        <div className="exif-editor">
          <h3>EXIF Data (Optional)</h3>
          <label>
            Artist:
            <input type="text" name="artist" value={exifData.artist} onChange={handleExifChange} />
          </label>
          <label>
            Copyright:
            <input type="text" name="copyright" value={exifData.copyright} onChange={handleExifChange} />
          </label>
          <label>
            User Comment:
            <input type="text" name="userComment" value={exifData.userComment} onChange={handleExifChange} />
          </label>
        </div>
        <button onClick={handleSubmit} disabled={processing || selectedFiles.length === 0}>
          {processing ? 'Converting...' : 'Convert'}
        </button>
      </div>

      <div className="results-section">
        <h2>Converted Images</h2>
        {convertedImages.length === 0 && !processing && <p>No images converted yet.</p>}
        {convertedImages.map((image, index) => (
          <div key={index} className="converted-image-item">
            <h3>{image.originalName}</h3>
            <img src={`data:image/webp;base64,${image.buffer}`} alt="Converted WebP" />
            <a
              href={`data:image/webp;base64,${image.buffer}`}
              download={`${image.originalName.split('.')[0]}.webp`}
            >
              Download WebP
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;