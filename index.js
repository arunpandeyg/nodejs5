const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

const express = require("express");
const morgan = require("morgan");
const server = express();

//body parser
server.use(express.json());

server.use(morgan("default"));

server.use(express.static("public"));



//C R U D MVC model view controller

const createProduct =  (req, res) => {
      console.log(req.body);
      products.push(req.body);
      res.status(201).json(req.body);
    }

  const getallProducts = (req, res) => {
    res.json(products);
};
  const getProduct = (req, res) => {
    const id = +req.params.id;
    const productIndex = products.findIndex((p) => p.id === id);
    products.splice(productIndex, 1, { ...req.body, id: id });
    res.json(product);
  };
    
const replaceProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json();
}; 


const updateProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1, { ...product, ...req.body });
  res.status(201).json(product);
};

const deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1);
  res.status(201).json();
};
//routing function
server.post("/products", createProduct);
server.get("/products", getallProducts);    
server.get("/products/:id", getProduct);
server.put("/products/:id", replaceProduct);
server.patch("/products/:id", updateProduct);
server.delete("/products/:id", deleteProduct);


server.listen(8080, () => {
  console.log("server started");
});
