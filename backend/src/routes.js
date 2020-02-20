import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

// CONTROLLERS IMPORT
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

// ROUTES
routes.get('/', (req, res) => {
  return res.json({ message: 'CantinaApp Initialized' });
});

// SESSION ROUTE

// USER ROUTES

// OPERATOR ROUTES

// FILE ROUTE
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
