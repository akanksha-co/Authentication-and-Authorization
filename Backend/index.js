const express =require('express')
const app = express();
const dbconnect = require('./config/dbconnect').dbconnect();
const auth = require('./routess/auth');
const cors = require('cors')
const corsOption = require('./Cors/allowedOrigins')
require('dotenv').config();
 
app.use(express.json());//
app.use(cors(corsOption))//frontend to backend ke sath jodta hai..
app.use('/api/v1',auth);
PORT = process.env.PORT || 4000

app.get('/',(req,res)=>{
    res.send("<h1>welcome</h1>")
})

app.listen(PORT,()=>{
    console.log(`server has started on this ${PORT}`);
})








