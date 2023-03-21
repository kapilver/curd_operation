const express = require('express');
require('./db/config');
const User = require('./db/Users');
const Product = require('./db/Product');
const app = express();
const cors = require('cors');
app.use(express.json());
var jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';

app.use(cors());
app.post("/register", async (req, res) => {
    let user = new User(req.body);
    console.log("----------", user)
    let result = await user.save();
    result = result.toObject();
    delete result.password
    jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err,token) => {
        if(err){
            res.send({result: "something went wornhg , please try afte some time"})
        }

        console.log('token----', token);
    res.send({result,auth:token});

    //you give any name insteaf of auth 

    })
})


app.post('/login',   async (req, res) => {

    console.log('body data--------', req.body);

    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select('-password');
        // res.send('-------------------user data findone',user);
        if (user) {

            jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err,token) => {

                if(err){
                    res.send({result: "something went wornhg , please try afte some time"})
                }
            res.send({user,auth:token});

            //you give any name insteaf of auth 

            })

        } else {
            res.send({ result: "no user found" });
        }

    } else {
        res.send({ result: 'no user found' });
    }
})

app.post('/add-product',verifyToken,async (req, res) => {

    let product = new Product(req.body);

    console.log('back end product-------------', product);

    let result = await product.save();
    res.send(result)
})

app.get('/products',verifyToken, async (req, res) => {

    let products = await Product.find();

    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: 'products not found' })
    }
})

app.delete('/product/:id',verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
    console.log('delete id----is---------------', result);

})

app.get('/product/:id',verifyToken, async (req, res) => {

    let result = await Product.findOne({ _id: req.params.id });
    if (result) {

        res.send(result)
    } else {
        res.send({ result: "no record found" });
    }

})

app.put('/product/:id',verifyToken, async (req, res) => {

    let result = await Product.updateOne(
        { _id: req.params.id }, {


        $set: req.body

    }

    )
    res.send(result)

})

app.get('/search/:key',verifyToken,async (req, res) => {
    console.log('all search data------', req.body);

    let result = await Product.find({

        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    });

    console.log('all search data------', result);
    res.send(result)
})


function verifyToken(req,res,next){
console.log('mideele ware coallerd=====');

let token= req.headers['authorization'];
console.log('token-------',token);
if(token){

    token = token.split(' ')[1];
    console.log('token-------',token);
    jwt.verify(token , jwtKey, (err,valid)=>{
        if(err){

            res.status(401).send({result:'please provide  valid token in header'})
        }else{


            next();
            
        }

    })

}else{
    res.status(403).send({result:'please add token in header'})

}

}


app.listen(5000);



















