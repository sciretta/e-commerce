import './database.connect';
import express from 'express';
import cors from 'cors';
import {
  createUser,
  loginUser,
  getUser,
  editUser,
} from './controllers/userControllers';
import { auth, authAdmin } from './middlewares/auth';
import {
  createProduct,
  deleteProduct,
  getProducts,
} from './controllers/productControllers';
import { getPurchases, newPurchase } from './controllers/purchaseControllers';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.set('port', 4000);

app.get('/user', auth, getUser);

app.post('/user/login', loginUser);

app.post('/user/signin', createUser);

app.put('/user/edit', auth, editUser);

app.get('/products', getProducts);

app.post('/product/create', auth, authAdmin, createProduct);

app.delete('/product/delete', auth, authAdmin, deleteProduct);

app.post('/purchase/new', auth, newPurchase);

app.get('/purchases', auth, getPurchases);

app.listen(process.env.PORT || app.get('port'), () => {
  console.log(`Servidor inicializado en el puerto ${app.get('port')}.`);
});
