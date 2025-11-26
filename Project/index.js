var exp = require('express');
var con = require('./db')
var app=exp();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // Allowed methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Allowed headers
  next();
});


app.get('/', async (req,res)=>
{
    res.send('HOME PAGE AND NODE JS SERVER STARTED !!!')
})


app.get('/contact', async (req,res)=>
{
    var result=await con.query('select * from contact')
    res.json({ menu: result.rows});
})


app.get('/contactbyId', async (req,res)=>
{
    try
    { 
    const {id} =req.body;
    var result=await con.query('select * from contact where id=$1',[id])
    res.json({ menu: result.rows});}
    
    catch(err){
        console.error(err.message);
        res.status(500).send('{status:401}');
    }
   
})


app.delete('/contactDelById', async (req,res)=>
{
    try
    { 
    const {id} =req.body;
    var result=await con.query('Delete from contact where id=$1',[id])
    res.json({ menu: result.rows});}
    
    catch(err){
        console.error(err.message);
        res.status(500).send('{status:401}');
    }
   
})

app.post('/addcontact', async (req,res)=>
{
    try
    { 
    const {name,email,mob,age,city} =req.body;
    var result=await con.query('insert into Contact(name,email,mob,age,city) VALUES ($1,$2,$3,$4,$5) RETURNING * ',[name,email,mob,age,city])
    res.json({ menu: result.rows});}
    
    catch(err){
        console.error(err.message);
        res.status(500).send('{status:401}');
    }
   
})

app.put('/updcontact', async (req,res)=>
{
    try
    { 
    const {name,email,mob,age,city,id} =req.body;
    var result=await con.query('update contact set name=$1,email=$2,mob=$3,age=$4,city=$5 where id=$6 RETURNING * ',[name,email,mob,age,city,id])
    res.json({ menu: result.rows});}
    
    catch(err){
        console.error(err.message);
        res.status(500).send('{status:401}');
    }
   
})

app.patch('/patchcontact', async (req,res)=>
{
    try
    { 
    const {name,id} =req.body;
    var result=await con.query('update contact set name=$1 where id=$2 RETURNING * ',[name,id])
    res.json({ menu: result.rows});}
    
    catch(err){
        console.error(err.message);
        res.status(500).send('{status:401}');
    }
   
})


app.listen(3000,()=>{

    console.log("Express JS Server Started")
})
