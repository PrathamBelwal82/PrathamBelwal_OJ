const express = require('express');
const app = express();
const { DBConnection } = require('./database/db.js');
const User = require('./models/Users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(cors());
app.use(express.json());

dotenv.config();



DBConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get('/', (req, res) => {
    res.send('Welcome!');
});

app.post("/register",async(req,res)=>{
    try {
        //get all data
        const {firstName,lastName,email,password,confirmPassword}=req.body;
        //all data exists
        if(!(firstName && lastName && email && password) && password!==confirmPassword){
            return res.status(400).send("Check Again");
        }
        //check if user exists
        const existingUser =await User.findOne({email});
        if(existingUser){
            return res.status(400).send("Error");
        }

        //encrypt password
        const hashPassword=bcrypt.hashSync(password,8);
        console.log(hashPassword);

        //save user to the database
        const user= await User.create({
            firstName,lastName,email,password:hashPassword
        });
        
        //generate a token for user and send it
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {expiresIn: "15d",});
        user.token = token;
        user.password = undefined;
        res.status(200).json({ message: "registered!", user });
    
    } catch (error) {
              console.log("error");
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
