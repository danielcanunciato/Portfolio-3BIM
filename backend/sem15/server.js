const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const API=express();
const PORT=4040;

API.use(express.json());

const JWT_TOKEN="chave-wowowo-4040-06082026";

const mocked_users = [
    {
        id: 1,
        nome: "Ana Castello",
        email: "anacastello@ambiente.com",
        hashed_password: bcrypt.hashSync("1234", 10),
        role: "user"
    },

    {
        id: 2,
        nome: "Administrador",
        email: "adm@ambiente.com",
        hashed_password: bcrypt.hashSync("1234", 10),
        role: "admin"
    },
    
]

API.get("/", (req,res)=>{
    return res.status(200).json({msg: "API is running."})
})

API.post("/login", (req,res)=>{
    const { email, password } = req.body;

    if (!email || !password) { 
        return res.status(400).json({error: "Missing credentials."});
    }

    const get_user = mocked_users.find(user => user.email === email);

    if (!get_user || !bcrypt.compareSync(password, get_user.hashed_password)) {
        return res.status(401).json({error: "Wrong credentials."})
    }

    const token = jwt.sign(
        {
            id: get_user.id,
            nome: get_user.nome,
            email: get_user.email,
            role: get_user.role
        },

        JWT_TOKEN,

        { expiresIn: "8h" }
    );

    return res.status(200).json({msg: "Logged in successfully.", token: token});
})


//

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    jwt.verify(token, JWT_TOKEN, (err, user) => {
        if (err) return res.status(403).json({error: "Invalid token."});

        req.user = user;

        return next();
    })
}

function authenticateRole(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).json({error: "Unauthorized: User is not admin."});
    };

    return next();
}

API.get("/profile", authenticateToken, (req,res)=>{
    return res.status(200).json({
        msg: "Protected route accessed.",
        user: req.user
    });
})

API.get("/admin-panel", authenticateToken, authenticateRole, (req,res)=>{
    return res.status(200).json({ msg: "Administrative panel accessed." });
})

API.listen(PORT, ()=>{
    return console.log(`API listening to port ${PORT}: http://localhost:${PORT}.`)
})