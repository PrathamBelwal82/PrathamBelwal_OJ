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
app.use(express.urlencoded({extended:true}));
dotenv.config();

DBConnection();


app.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password,confirmPassword } = req.body;

        if (!firstName || !lastName || !email || !password ) {
            return res.status(400).json({ error: "Check Again" });
        }

        if (password!==confirmPassword ) {
            return res.status(400).json({ error: "Check Again" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashPassword = bcrypt.hashSync(password, 8);

        const user = await User.create({
            firstName, lastName, email, password: hashPassword
        });

        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY);
        user.token = token;
        user.password = undefined;
        
        res.status(200).json({ message: "Registered!", user });
    
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
