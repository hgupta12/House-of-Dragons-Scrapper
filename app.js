const fetchData = require('./scrapper');
const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'))

const PORT = process.env.PORT || 5000
const getData = async (req,res)=>{
   const data = await fetchData();
   res.status(200).json(data);
}

const showData = async (req,res)=>{
    const data = await fetchData();
    res.render('index',{
        data
    })
}

app.get('/',showData);

app.get('/api',getData);

app.listen(PORT, ()=>{
    console.log(`Listening at port ${PORT}`);
})
