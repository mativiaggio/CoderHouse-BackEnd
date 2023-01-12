import express from "express";

import ProductManager from "./ProductManager.js";
const productManager = new ProductManager();

const app = express();

const PORT = 8080;

// End-Point a la pagina principal del servidor
app.get("/", (req, res) => {
  res.send(`Welcome to the shop
  <br><br>
  <a href="/shop">Shop</a>`);
});

// End-Point a la pagina main del shop
app.get("/shop", (req, res) => {
  res.send(`
  <h1>Welcome to the shop<h1><br><br>
  <h3><p><a href="shop/0" style="text-decoration:none; color: darkblue; text-decoration: underline; font-size:medium;">Ver informacion de producto 0<a><p></h3>
  <h3><p><a href="shop/1" style="text-decoration:none; color: darkblue; text-decoration: underline; font-size:medium;">Ver informacion de producto 1<a><p></h3>
  <h3><p><a href="shop/2" style="text-decoration:none; color: darkblue; text-decoration: underline; font-size:medium;">Ver informacion de producto 2<a><p></h3>
  <h3><p><a href="/products/" style="text-decoration:none; color: darkblue; text-decoration: underline; font-size:medium;">Ver TODOS los productos<a><p></h3>
  `);
});

// End-Point del shop con el ID del producto
app.get("/shop/:pid", (req, res) => {
  const { pid } = req.params;
  const pidNum = parseInt(pid);
  res.send(productManager.getProductById(pidNum));
});

// End-Point a todos los productos. Se puede pasar por query desde el front un limit (ej: productos/?limit=2) lo que limitara los resultados mostrados. Si no se pasa un limit muestra todos.
app.get("/products/", (req, res) => {
  const { limit } = req.query;
  res.json(productManager.getProductsWithRange(limit));
});

app.listen(PORT, () => {
  console.log(`Escuchando al puerto: ${PORT}`);
});
