const express=require('express');
const app=express();
const path =require('path');
const config=require('./config/default.json');
const mongoose=require('mongoose');
const userRouter=require('./routes/users');
const authRouter=require('./routes/auth');
const favoriteRouter=require('./routes/favorite');
const bodyParser=require('body-parser')



app.use(bodyParser.json())
const db=config.mongoURI
mongoose.connect(db)
.then(()=>{
    console.log("Connected to server")
}).catch(err=>{
    console.log(err)
})

const port =process.env_PORT||5000
app.listen(port,()=>{
    console.log(`server running in port ${port}`);
})

app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/favorite',favoriteRouter);

app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;