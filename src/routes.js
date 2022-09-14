import express from "express";

import uploadImage from './middlewares/uploadImage.js'
import uploadImageController from './controllers/uploadImageController.js'

export const routes = express.Router();

routes.use('/upload-image', uploadImage.single('image'), uploadImageController);