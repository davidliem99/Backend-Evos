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
    res.send('<h1>Ini Homepage</h1>')   
    
})

//backend table movies dimulai
//read data user
app.get('/users' , (req,res) => {
    var sql = 'select * from users;'
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
//edit data user
app.post('/users-edit/:id',(req,res)=>{
    var editUsers = req.body
    var sql = `update users set ? where id=${req.params.id}`;
    conn.query(sql, editUsers,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
//delete data user

app.delete('/delete-users/:id',(req,res)=>{
    var sql = `delete from users where id=${req.params.id}`;
    conn.query(sql,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//create data user
app.post('/add-users',(req,res)=>{
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
app.get('/produk-list' , (req,res) => {
    var sql = 'select * from produk;'
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//delete data produk
app.post('/produk-delete/:id',(req,res)=>{
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
app.get('/kategori-list' , (req,res) => {
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
app.post('/kategori-delete/:id',(req,res)=>{
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
app.get('/img-list' , (req,res) => {
    var sql = 'select * from image';
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//read data image by id produk
app.get('/get-imgproduk/:id' , (req,res) => {
    var sql = `select * from image where id_produk = ${req.params.id}`;
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//update / edit data image
app.post('/image-edit/:id',(req,res)=>{
    var editImg = req.body
    var sql = `update image set ? where id_produk=${req.params.id}`;
    conn.query(sql, editImg,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

//delete image
app.post('/image-delete/:id',(req,res)=>{
    var sql = `delete from image where id_produk=${req.params.id}`;
    conn.query(sql,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})
app.get('/produk-detail/:id' , (req,res) => {
    var sql = `SELECT 
    p.id as id,
    p.namaproduk as nama_produk,
     p.hargaproduk as harga_produk, 
     k.nama as kategori, 
     i.img1 as image1, 
     i.img2 as image2, 
     i.img3 as image3 
     FROM produk p 
     JOIN kategori k ON p.kategoriproduk = k.id 
     JOIN image i on p.id = i.id_produk
     WHERE p.id = ${req.params.id}`
    conn.query(sql ,(err,result)=>{
        res.send(result)
        console.log(result)
    })
})

app.listen(port, () => console.log('API Active On Port ' + port))