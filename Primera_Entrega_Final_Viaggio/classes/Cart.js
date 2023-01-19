import fs from "fs";

export default class Cart {
  // Constructor
  constructor(path) {
    this.path = path;
  }

  //   Creador del cart
  async createCart(obj) {
    try {
      const cartDatabase = await this.searchCart();
      let id =
        cartDatabase.length === 0
          ? 1
          : cartDatabase[cartDatabase.length - 1].id + 1;
      const cart = { id, ...obj };
      cartDatabase.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartDatabase));
      return cart;
    } catch (error) {
      return error;
    }
  }

  //   Busco los productos
  async searchCart() {
    try {
      if (fs.existsSync(this.path)) {
        const cartDatabase = await fs.promises.readFile(this.path, "utf-8");
        const cartJS = JSON.parse(cartDatabase);
        return cartJS;
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }

  // Busco cart por ID
  async searchCartById(idCart) {
    try {
      const carts = await this.searchCart();
      const cart = carts.find((u) => u.id === idCart);
      return cart;
    } catch (error) {
      return error;
    }
  }

  async modifyCart(idCart, obj) {
    try {
      const cartsDatabase = await this.searchCartById(idCart);
      cartsDatabase.products.push(obj);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsDatabase));
      return updatedCart;
    } catch (error) {
      return error;
    }
  }
}
