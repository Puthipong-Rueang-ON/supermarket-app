const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const routes = require('./routes/productRoutes');
app.use('/', routes);

app.listen(3000, () => {
  console.log('http://localhost:3000');
});