import { Router } from "express";
import Product from "../classes/Product.js";

const router = Router();
const productClass = new Product("./JSON/Products.json");

const products = [];

// Rutas
router.get("/", async (req, res) => {
  const { limit } = req.query;
  try {
    if ((limit === 0) | (limit == undefined)) {
      const products = await productClass.searchProducts();
      res.json({ products });
    } else {
      const products = await productClass.getProductsWithRange(limit);
      res.json({ products });
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const product = await productClass.searchById(parseInt(idProduct));
    if (product) {
      res.status(200).json({ message: "Product: ", product });
    } else {
      res.status(400).json({ error: "Not found" });
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  const obj = req.body;
  const product = await productClass.createProduct(obj);
  products.push(product);
  res.json({ message: "Product created: ", product });
});

router.put("/:idProducts", async (req, res) => {
  const { idProducts } = req.params;
  const obj = req.body;
  const product = await productClass.modifyProduct(parseInt(idProducts), obj);
  res.json({ message: "Usuario actualizado con exito", product });
});

router.delete("/:idProducts", async (req, res) => {
  const { idProducts } = req.params;
  const product = await productClass.deleteProduct(parseInt(idProducts));
  res.json({ message: "Product deleted", product });
});

export default router;
