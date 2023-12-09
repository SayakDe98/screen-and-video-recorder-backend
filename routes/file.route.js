const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const fileController = require('../controller/file.controller');
const { upload } = require('../util/fileUpload');

router.post('/upload', authenticate,  upload.single("file"), fileController.upload);

module.exports = router;