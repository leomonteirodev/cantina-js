import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

// => Controllers
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';
import ProductController from './app/controllers/ProductController';
import OperatorController from './app/controllers/OperatorController';
import CoreController from './app/controllers/CoreController';
import DebtorsController from './app/controllers/DebtorsController';
import InputController from './app/controllers/InputController';

// => Validations
import validateUserStore from './app/validations/UserStore';
import validateUserUpdate from './app/validations/UserUpdate';
import validateOperatorStore from './app/validations/OperatorStore';
import validateOperatorUpdate from './app/validations/OperatorUpdate';
import validateSessionStore from './app/validations/SessionStore';
import validateInputStore from './app/validations/InputStore';
import validateInputUpdate from './app/validations/InputUpdate';
import validateProductStore from './app/validations/ProductStore';
import validateProductUpdate from './app/validations/ProductUpdate';

// => Middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// => Test route
routes.get('/', ({ res }) => {
  return res.json({ message: 'Cantina Application Initialized' });
});

// => Authentication route
routes.post('/sessions', validateSessionStore, SessionController.store);

// => Auth Middleware
routes.use(authMiddleware);

// => Core routes
routes.post('/cores', CoreController.store);

// => User routes
routes.get('/users', UserController.index);
routes.post('/users', validateUserStore, UserController.store);
routes.put('/users/:id', validateUserUpdate, UserController.update);
routes.delete('/users/:id', UserController.destroy);

// => Operator routes
routes.get('/operators', OperatorController.index);
routes.post('/operators', validateOperatorStore, OperatorController.store);
routes.put('/operators', validateOperatorUpdate, OperatorController.update);
routes.delete('/operators', OperatorController.destroy);

// => Product routes
routes.get('/products', ProductController.index);
routes.post('/products', validateProductStore, ProductController.store);
routes.put('/products/:id', validateProductUpdate, ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

// => Input routes
routes.get('/inputs', InputController.index);
routes.post('/inputs', validateInputStore, InputController.store);
routes.put('/inputs/:id', validateInputUpdate, InputController.update);
routes.delete('/inputs/:id', InputController.destroy);

// => Debtor routes
routes.get('/debtors', DebtorsController.index);

// => Upload routes
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
