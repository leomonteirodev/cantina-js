import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

// CONTROLLERS IMPORT
import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';

const routes = new Router();
const upload = multer(multerConfig);

// ROUTES
routes.get('/', (req, res) => {
  return res.json({ message: 'CantinaApp Initialized' });
});

// SESSION ROUTE

// USER ROUTES
routes.post('/users', UserController.store);

// OPERATOR ROUTES

// FILE ROUTE
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
