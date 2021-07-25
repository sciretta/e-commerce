import './database.connect';
import express from 'express';
import cors from 'cors';
import { createUser, loginUser, getUser } from './controllers/usersController';
import { auth } from './middlewares/auth';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.set('port', 4000);

app.get('/user', auth, getUser);

app.post('/user/login', loginUser);

app.post('/user/signin', createUser);

app.listen(app.get('port'), () => {
  console.log(`Servidor inicializado en el puerto ${app.get('port')}.`);
});
