const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'xeushome',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, WebP, and GIF images are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max per file
});

// POST /api/upload - Upload single image (admin only)
router.post('/', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    res.status(201).json({
      message: 'Image uploaded successfully',
      image_url: req.file.path,
      filename: req.file.filename,
      originalname: req.file.originalname,
      size: req.file.size,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// POST /api/upload/multiple - Upload multiple images (admin only)
router.post('/multiple', authenticateToken, upload.array('images', 20), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' });
    }

    const uploadedFiles = req.files.map((file) => ({
      image_url: file.path,
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
    }));

    res.status(201).json({
      message: `${uploadedFiles.length} images uploaded successfully`,
      files: uploadedFiles,
    });
  } catch (err) {
    console.error('Multiple upload error:', err);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

// DELETE /api/upload/:filename - Delete an uploaded image (admin only)
router.delete('/:filename', authenticateToken, (req, res) => {
  try {
    const { filename } = req.params;
    // Cloudinary public_id is stored as the filename (without extension)
    const publicId = `xeushome/${filename.replace(/\.[^/.]+$/, '')}`;

    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error('Cloudinary delete error:', error);
        return res.status(500).json({ error: 'Failed to delete image' });
      }
      res.json({ message: 'Image deleted successfully' });
    });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

module.exports = router;
