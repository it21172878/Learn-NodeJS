const express = require('express');

const app = express();

app.listen(8080, () => {
  console.log('Server is running at http://localhost:8080');
});

app.get('/products', (req, res) => {
  console.log('Get request incoming...');
  res.send({ message: 'Get Request Success' });
});

app.get('/users/:id', (req, res) => {
  console.log(req.params.id);
  res.send({ message: 'User Response' });
});
