import fs from "fs";

export default class Product {
  // Constructor
  constructor(path) {
    this.path = path;
  }

  //   Creador del producto
  async createProduct(obj) {
    try {
      const productsDatabase = await this.searchProducts();
      let id =
        productsDatabase.length === 0
          ? 1
          : productsDatabase[productsDatabase.length - 1].id + 1;
      let product = { id, ...obj };
      productsDatabase.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(productsDatabase));
      return product;
    } catch (error) {
      return error;
    }
  }

  //   Busco los productos
  async searchProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const productsDatabase = await fs.promises.readFile(this.path, "utf-8");
        const productJS = JSON.parse(productsDatabase);
        return productJS;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  // Busco con limit
  async getProductsWithRange(param) {
    try {
      const products = await this.searchProducts();
      return products.slice(0, param);
    } catch (error) {
      return error;
    }
  }

  // Busco producto por ID
  async searchById(idProduct) {
    try {
      const products = await this.searchProducts();
      const product = products.find((u) => u.id === idProduct);
      return product;
    } catch (error) {
      return error;
    }
  }

  // Modifico el producto
  async modifyProduct(idProduct, obj) {
    try {
      const productsDatabase = await this.searchProducts();
      const indexProduct = productsDatabase.findIndex(
        (u) => u.id === idProduct
      );
      if (indexProduct === -1) throw new Error("Producto no encontrado");
      const updatedProduct = { ...productsDatabase[indexProduct], ...obj };
      productsDatabase.splice(indexProduct, 1, updatedProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(productsDatabase));
      return updatedProduct;
    } catch (error) {
      return error;
    }
  }

  // Elimino un producto
  async deleteProduct(idProduct) {
    try {
      const productsDatabase = await this.searchProducts();
      const indexProduct = productsDatabase.findIndex(
        (u) => u.id === idProduct
      );
      if (indexProduct === -1) throw new Error("Producto no encontrado");
      productsDatabase.splice(indexProduct, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(productsDatabase));
      return idProduct;
    } catch (error) {
      return error;
    }
  }
}
