const express = require('express');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload изображения
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Загрузка в Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'beautylanding',
      resource_type: 'auto',
    });

    // Удаление временного файла
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
