/* Este codigo corresponde al desafio numero 2 */

export default class ProductManager {
  #iva = 0.21;
  constructor() {
    this.products = [
      {
        code: 0,
        title: "Iphone XS",
        description: "Smartphone",
        price: 1200 + 1200 * this.#iva,
        thumbnail: "./iphonexs.jpg",
        stock: 10,
      },
      {
        code: 1,
        title: "Samsung s22",
        description: "Smartphone",
        price: 1150 + 1150 * this.#iva,
        thumbnail: "./samsungs21.jpg",
        stock: 15,
      },
      {
        code: 2,
        title: "Motorola moto g60",
        description: "Smartphone",
        price: 800 + 800 * this.#iva,
        thumbnail: "./motog60.jpg",
        stock: 30,
      },
    ];
  }
  addProduct(title, description, price, thumbnail, stock = 10) {
    const product = {
      code: this.#codeGenerator(),
      title,
      description,
      price: price + price * this.#iva,
      thumbnail,
      stock,
    };
    this.products.push(product);
  }
  #codeGenerator() {
    const code =
      this.products.length === 0
        ? 0
        : this.products[this.products.length - 1].code + 1;
    return code;
  }

  getProducts() {
    const productosCargadosMessage = console.log(
      "Estos son todos tus productos:\n"
    );
    const productsStringlify = console.log(
      "Productos: " + JSON.stringify(this.products) + "\n"
    ); // RETORNA UN CONSOLE.LOG DEL ARRAY EN FORMA DE STRING
    const productsArray = console.log(this.products); // RETORNA UN CONSOLE.LOG DEL ARRAY
    // return productosCargadosMessage, productsStringlify, productsArray;
    return this.products;
  }

  getProductsWithRange(param) {
    return this.products.slice(0, param);
  }

  getProductById(param) {
    const product = this.products.find((obj) => obj.code === param);
    if (product === undefined) {
      const error = console.log("No existe un producto con este ID\n");
      return error;
    } else {
      const successMessage = console.log(
        "\nEl objecto obtenido es el siguiente:\n"
      );
      const success = console.log(product);
      // return successMessage, success;
      return product;
    }
  }

  updateProduct(code, title, description, price, thumbnail, stock = 10) {
    const productIndex = this.products.findIndex((obj) => obj.code === code);
    if (productIndex === undefined) {
      const error = console.log("No existe un producto con este ID\n");
      return error;
    } else {
      this.products[productIndex] = {
        code: code,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        stock: stock,
      };
    }
    const logMessage = console.log("\nProductos actualizados con exito!\n");
    const logProductos = console.log(this.products);
    // return logMessage, logProductos;
    return this.products;
  }

  deleteProduct(code) {
    const productIndex = this.products.findIndex((obj) => obj.code === code);
    if (productIndex === undefined) {
      const error = console.log("No existe un producto con este ID\n");
      return error;
    } else {
      this.products.splice(productIndex);
      const logMessage = console.log(
        `\nEl producto fue eliminado con exito!\nTus productos actuales:\n`
      );
      const logProductos = console.log(this.products);
      // return logMessage, logProductos;
      return this.products;
    }
  }
}
/* const productManager = new ProductManager();
productManager.addProduct("Iphone XS", "Smartphone", 1200, "./iphonexs.jpg");
productManager.addProduct("Galaxy s22", "Smartphone", 1000, "./galaxys22.jpg");
productManager.getProducts(); // Trae todos los productos cargados
productManager.getProductById(1); // Usa como parametro el ID que quieres buscar.
productManager.updateProduct(
  0,
  "Galaxy s21",
  "Smartphone",
  900,
  "./galaxys21.jpg"
); // Actualizas un item colocando el codigo o ID, seguido de los mismos parametros que pondrias en addProduct. CONSERVA EL ID.
productManager.deleteProduct(1); // Elimina el producto cuyo codigo o ID pases en el parametro.
 */
