import mongoose from 'mongoose';

const URI =
  'mongodb+srv://leo:7zbd5Xjac8Ju46lm@cluster0.yxyiv.mongodb.net/e-commerce?retryWrites=true&w=majority';

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Conectado a la base de datos.'))
  .catch((err) => {
    console.error(`Error de conexion a la base de datos:${err.message}`);
  });

module.exports = mongoose;
