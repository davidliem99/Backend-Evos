const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var fs = require('fs');

var port = 2000;

var app = express({defaultErrorHandler:false});

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))
const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'evos',
    port: 3306
});

//PAKE NODE INDEX.JS

app.get('/', (req,res) => {
    res.send('<center><h1>SUCCESS RUNNING API</h1></center>')   
    
})

//LOGIN
app.post('/login',(req,res) => {
    var username = req.body.username;
    var password = req.body.password;
    var sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    conn.query(sql,(err,result) => {
        if(err) throw err;
        if(result !== undefined){
            res.send(result)
            console.log(result)
        }
        else{
            res.send('username atau password salah')
        }
    })
})

//REGISTER
app.post('/register', (req,res) =>{
    var newUser = {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    }
    var sql = `insert into users set ?`
    conn.query(sql,newUser,(err,result)=>{
        if(err){
            return res.status(500).json({message:"There is an error", error:err.message})
        }
        else{
            res.send(result)
        }
    })
})

//KEEP LOGIN
app.get('/keeplogin' , (req,res) => {
    var username = req.query.username
    var sql = `select * from users where username = '${username}' ;`
    conn.query(sql,(err,result)=>{
        if(err) throw err
        res.send(result)
        console.log(result)
    })
})

//USER CHECK
app.get('/usercheck' , (req,res) => {
    var username = req.query.username
    var sql = `select * from users where username = '${username}' ;`
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//backend table movies dimulai
//read data user
app.get('/user' , (req,res) => {
    var sql = 'select * from users;'
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
//edit data user
app.post('/user-edit/:id',(req,res)=>{
    var editUsers = req.body
    var sql = `update users set ? where id=${req.params.id}`;
    conn.query(sql, editUsers,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//delete data user
app.delete('/delete-user/:id',(req,res)=>{
    var sql = `delete from users where id=${req.params.id}`;
    conn.query(sql,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//create data user
app.post('/add-user',(req,res)=>{
    var addUsers = req.body
    var sql = `insert into users set ?`;
    conn.query(sql, addUsers,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//akhir backend table user




//manage produk dimulai
//add produk
app.post('/produk-add',(req,res)=>{
    var addProduk = req.body
    var sql = `insert into produk set ?`;
    conn.query(sql, addProduk,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//edit produk
app.post('/produk-edit/:id',(req,res)=>{
    var editProduk = req.body
    var sql = `update produk set ? where id=${req.params.id}`;
    conn.query(sql, editProduk,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
//read data produk
app.get('/produk' , (req,res) => {
    var sql = 'select * from produk;'
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//delete data produk
app.delete('/produk-delete/:id',(req,res)=>{
    var sql = `delete from produk where id=${req.params.id}`;
    conn.query(sql,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
//akhir backend table produk

//kategori backend dimulai
//create data kategori
app.post('/kategori-add',(req,res)=>{
    var addImg = req.body
    var sql = `insert into kategori set ?`;
    conn.query(sql, addImg,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
//read data kategori
app.get('/kategori' , (req,res) => {
    var sql = 'select * from kategori';
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//update / edit data kategori
app.post('/kategori-edit/:id',(req,res)=>{
    var editImg = req.body
    var sql = `update kategori set ? where nama=${req.params.id}`;
    conn.query(sql, editImg,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//delete kategori
app.delete('/kategori-delete/:id',(req,res)=>{
    var sql = `delete from kategori where id=${req.params.id}`;
    conn.query(sql,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})



//image backend dimulai
//create data image
app.post('/img-add',(req,res)=>{
    var addImg = req.body
    var sql = `insert into image set ?`;
    conn.query(sql, addImg,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//read data image
app.get('/img' , (req,res) => {
    var sql = 'select * from image';
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//read data image by id produk
app.get('/img/:id' , (req,res) => {
    var sql = `select * from image where id_produk = ${req.params.id}`;
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//update / edit data image
app.post('/img-edit/:id',(req,res)=>{
    var editImg = req.body
    var sql = `update image set ? where id_produk=${req.params.id}`;
    conn.query(sql, editImg,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//delete image
app.delete('/img-delete/:id',(req,res)=>{
    var sql = `delete from image where id=${req.params.id}`;
    conn.query(sql,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//show produk detail
app.get('/produk-detail/:id' , (req,res) => {
    var sql = `SELECT 
    p.id as id,
    p.namaproduk as nama,
     p.hargaproduk as harga, 
     k.nama as kategori, 
     i.img1 as image1, 
     i.img2 as image2, 
     i.img3 as image3 
     FROM produk p 
     JOIN kategori k ON p.kategoriproduk = k.id 
     JOIN image i ON p.id = i.id_produk
     WHERE p.id = ${req.params.id}`
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//show list produk
app.get('/list-produk', (req,res) => {
    var sql = `SELECT 
    p.id as id,
    p.namaproduk as nama,
     p.hargaproduk as harga, 
     k.nama as kategori, 
     i.img1 as image
     FROM produk p 
     JOIN kategori k ON p.kategoriproduk = k.id 
     JOIN image i ON p.id = i.id_produk`
    conn.query(sql,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//Mulai API Cart
app.get('/list-cart/:username', (req,res) => {
    var sql = `SELECT
    p.namaproduk as nama_produk,
     p.hargaproduk as harga_produk,
     c.qty as qty
    FROM cart c
    JOIN users u ON c.id_user = u.id
    JOIN produk p ON c.id_produk = p.id
    WHERE u.username = '${req.params.username}'`
    conn.query(sql,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

app.post('/insert-cart',(req,res)=>{
    var insertCart = req.body
    var sql = `insert into cart set ?`;
    conn.query(sql, insertCart,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

app.post('/edit-cart/:id',(req,res)=>{
    var editcart = req.body
    var sql = `update cart set ? where =${req.params.id}`;
    conn.query(sql, editcart,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})


app.delete('/delete-cart/:id',(req,res)=>{
    var sql = `delete from cart where id=${req.params.id}`;
    conn.query(sql,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})







app.listen(port, () => console.log('API Active On Port ' + port))