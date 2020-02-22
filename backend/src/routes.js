import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

// CONTROLLERS IMPORT
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';
import ProductController from './app/controllers/ProductController';
import OperatorController from './app/controllers/OperatorController';
import CoreController from './app/controllers/CoreController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// ROUTES
routes.get('/', (req, res) => {
  return res.json({ message: 'CantinaApp Initialized' });
});

// AUTHENTICATION ROUTE
routes.post('/sessions', SessionController.store);

// APPLYING MIDDLEWARE
routes.use(authMiddleware);

// CORE ROUTES
routes.post('/cores', CoreController.store);

// USER ROUTES
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

// OPERATOR ROUTES
routes.get('/operators', OperatorController.index);

// PRODUCT ROUTES
routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);

// FILE ROUTE
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
