 const express = require('express');
 const ProductRouters = require( './routers/products');
 const cartRouters = require (' ./routers/carts');



 const app = express();

 const PORT = 8080;

app.use(express.json());

app.use('/api/products', ProductRouters);
app.use('/api/carts', cartRouters);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
});