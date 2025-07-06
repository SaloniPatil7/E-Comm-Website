const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/Product.js');
const User = require('./models/User.js');
const cors = require('cors');
const Jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtKey = process.env.JWT_KEY;
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.ATLASDB_URL;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(DB_URL);
  console.log("DB Connected");
}

function handleAsync(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get('', (req, res) => {
  res.send("done");
});

app.post('/signup', handleAsync(async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;

  Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
    if (err) return res.status(500).json({ error: "Token generation failed" });
    return res.status(200).json({ user: result, auth: token });
  });
}));

app.post('/login', handleAsync(async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    let result = await User.findOne({ email, password }).select("-password");

    if (result) {
      Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
        if (err) return res.send({ result: "something went wrong" });
        return res.send({ user: result, auth: token });
      });
    } else {
      return res.send({ result: "user not exist" });
    }
  } else {
    return res.send({ result: "email and password is neceesary" });
  }
}));

app.post('/add-product', verifyToken, handleAsync(async (req, res) => {
  const product = new Product(req.body);
  const result = await product.save();
  res.send(result);
}));

app.get('/products', verifyToken, handleAsync(async (req, res) => {
  const products = await Product.find({});
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send('no Products Found');
  }
}));

app.delete('/delete/:id', verifyToken, handleAsync(async (req, res) => {
  const result = await Product.findByIdAndDelete(req.params.id);
  if (result) {
    res.send({ message: "Product deleted successfully" });
  } else {
    res.status(404).send({ message: "Product not found" });
  }
}));

app.put('/update/:id', verifyToken, handleAsync(async (req, res) => {
  const result = await Product.findById(req.params.id);
  if (result) {
    res.send({ message: "Product Updated" });
  } else {
    res.status(404).send({ message: "Product not found" });
  }
}));

app.get('/product/:id', verifyToken, handleAsync(async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Product Found" });
  }
}));

app.put('/product/:id', verifyToken, handleAsync(async (req, res) => {
  const result = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
  if (result) {
    res.send(result);
  } else {
    res.send('no Product  found ');
  }
}));

app.get('/search/:key', verifyToken, handleAsync(async (req, res) => {
  const result = await Product.find({
    "$or": [
      { name: { $regex: req.params.key, $options: "i" } },
      { company: { $regex: req.params.key, $options: "i" } },
      { category: { $regex: req.params.key, $options: "i" } }
    ]
  });
  res.send(result);
}));

function verifyToken(req, res, next) {
  let token = req.headers['authorization'];
  if (token) {
    token = token.split(' ')[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        return res.status(401).send({ result: "please send valid token " });
      } else {
        next();
      }
    });
  } else {
    return res.status(403).send({ result: "please send token with header" });
  }
}


app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).send({ error: 'Internal server error', message: err.message });
});
