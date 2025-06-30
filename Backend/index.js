const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Product = require('./models/Product.js')
const User = require('./models/User.js')
const cors = require('cors');
const Jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtKey = process.env.JWT_KEY;
const PORT = process.env.PORT || 3000;
DB_URL = process.env.ATLASDB_URL



app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(DB_URL);

}


app.listen(PORT, () => {
  console.log('listening');
})
app.get('', (req, res) => {
  res.send("done");
})

app.post('/signup', async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
    if (err) {
      res.send({ result: "something went wrong" })
    } else {
      res.send({ user: result, auth: token });
    }

  });
})

app.post('/login', async (req, res) => {
  if (req.body.password && req.body.email) {
    let result = await User.findOne(req.body).select("-password");
    if (result) {
      Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
        if (err) {
          res.send({ result: "something went wrong" })
        } else {
          res.send({ user: result, auth: token });
        }

      });

    } else {
      res.send({ result: "user not exist" });
    }
  } else {
    res.send({ result: "email and password is neceesary" });
  }

})


app.post('/add-product', verifyToken, async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
})


app.get('/products', verifyToken, async (req, res) => {
  let products = await Product.find({});
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send('no Products Found');
  }

})


app.delete('/delete/:id', verifyToken, async (req, res) => {
  let { id } = req.params;
  let result = await Product.findByIdAndDelete(id);
  if (result) {
    res.send({ message: "Product deleted successfully" });
  } else {
    res.status(404).send({ message: "Product not found" });
  }
})

app.put('/update/:id', verifyToken, async (req, res) => {
  let { id } = req.params;
  console.log(id);
  let result = await Product.findById(id);
  if (result) {
    res.send({ message: "Product Updated" });
  } else {
    res.status(404).send({ message: "Product not found" });
  }
})



app.get('/product/:id', verifyToken, async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });

  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Product Found" });
  }
})


app.put('/product/:id', verifyToken, async (req, res) => {
  let { id } = req.params;
  let result = await Product.findByIdAndUpdate(id, { $set: req.body }, { new: true });
  if (result) {
    res.send(result);
  } else {
    res.send('no Product  found ')
  }
})


app.get('/search/:key', verifyToken, async (req, res) => {
  let result = await Product.find({
    "$or": [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } }
    ]
  });

  res.send(result);

})


// middleware
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
