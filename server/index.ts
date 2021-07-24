import './database.connect';
import express from 'express';
import { createUser, loginUser } from './controllers/usersController';
// import { auth } from './middlewares/auth';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('port', 4000);

app.post('/user/login', loginUser);

app.post('/user/signin', createUser);

app.listen(app.get('port'), () => {
  console.log(`Servidor inicializado en el puerto ${app.get('port')}.`);
});
