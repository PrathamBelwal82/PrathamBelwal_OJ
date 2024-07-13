const express = require('express');
const app = express();
const { DBConnection } = require('./database/db.js');
const User = require('./models/Users.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const problemRoutes = require('./routes/problemRoutes')
const submissionRoutes = require('./routes/submissionRoutes')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));

dotenv.config();

DBConnection();

app.get('/', async (req, res) => {
    try {
        res.status(200).json("Hi");
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

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

app.use('/problems',problemRoutes);
app.use('/submissions', submissionRoutes);
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
