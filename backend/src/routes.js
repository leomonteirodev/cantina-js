import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  return res.json({ message: 'CantinaApp Initialized' });
});

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
