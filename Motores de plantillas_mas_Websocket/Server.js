import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

// dirname
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.engine("handlebars", handlebars.engine());

app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.get("/", (req, res) => {
  res.render("socket");
});

const PORT = 8080;
const succMessage = "Happy coding!";

const httpServer = app.listen(PORT, () => {
  console.log(succMessage);
});

// socket
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("usuario conectado ", socket.id);
  socket.on("disconnect", () => {
    console.log("usuario desconectado");
  });
});
