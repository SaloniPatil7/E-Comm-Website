const mongoose = require('mongoose');

const ProductSchema =new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   price:{
    type:String,
    required:true
   },
    category:{
    type:String,
    required:true
   },
   userID:{
    type:String,
    required:true
   },
   company:{
    type:String,
    required:true
   }
});

const Product=mongoose.model("Product",ProductSchema);
module.exports=Product;