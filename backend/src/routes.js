import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

// CONTROLLERS IMPORT
import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';
import ProductController from './app/controllers/ProductController';
import OperatorController from './app/controllers/OperatorController';

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
routes.get('/operators', OperatorController.index);
// PRODUCT ROUTES
routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);

// FILE ROUTE
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
