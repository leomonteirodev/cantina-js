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
import DebtorsController from './app/controllers/DebtorsController';

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

// CORE ROUTES
routes.post('/cores', CoreController.store);

// USER ROUTES
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

// OPERATOR ROUTES
routes.get('/operators', OperatorController.index);
routes.post('/operators', OperatorController.store);

// PRODUCT ROUTES
routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);

// DEBTORS CONTROLLERS
routes.get('/debtors', DebtorsController.index);

// FILE ROUTE
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
