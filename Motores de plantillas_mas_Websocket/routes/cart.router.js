import { Router } from "express";
import Cart from "../classes/Cart.js";
import Product from "../classes/Product.js";

const router = Router();
const cartClass = new Cart("./JSON/Cart.json");
const productClass = new Product("./JSON/Products.json");

router.post("/", async (req, res) => {
  const obj = req.body;
  const cart = await cartClass.createCart(obj);
  res.json({ message: "Cart created: ", cart });
});

router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  try {
    const cart = await cartClass.searchCartById(parseInt(idCart));
    if (cart) {
      res.status(200).json({ message: "Cart: ", cart });
    } else {
      res.status(400).json({ error: "Not found" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/:idCart/product/:idProduct", async (req, res) => {
  const { idCart } = req.params;
  const { idProduct } = req.params;
  try {
    const product = await productClass.searchById(parseInt(idProduct));
    if (product) {
      const cart = await cartClass.modifyCart(parseInt(idCart), product);
      res.json({ message: "Usuario actualizado con exito", cart });
    }
  } catch (error) {
    res.send(error);
  }
});

export default router;
