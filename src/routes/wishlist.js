const express = require("express");
const { isLoggedIn } = require("../controllers/login");
const router = express.Router();
const wishlistController = require('../controllers/wishlist');

router.get('/',isLoggedIn, (req,res)=>{
    const email = req.session.username;
    res.render('wishlist',{items:wishlistController.getWishlist(email)});
});

router.post('/remove',isLoggedIn,(req,res)=>{

});

router.post('addToCart',isLoggedIn,(req,res)=>{});

module.exports=router;