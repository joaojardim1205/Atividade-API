
const express = require("express")
const bcrypt = require("bcrypt")
const db = require("./db")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

app.post("/register", (req, res) => {
    const {nome, email, senha} = req.body;

    bcrypt.hash(senha, 10, (err, hash) => {
        if(err) return res.status(500).json({error: "Erro ao criptografar senha"})

        const sql = "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)";
        db.query(sql, [nome, email, hash], (err) => {
            if(err) return res.status(500).json({error: "erro ao cadastrar usuario"});
            res.status(201).json({message: "Usuario cadastrado com sucesso! "})
        })
    })
})

app.post("/login", (req, res) => {
    const {email, senha} = req.body

    const sql = "SELECT * FROM users WHERE EMAIL = ?";
    db.query(sql, [email], (err, results) => {
        if(err) return res.status(500).json({error: 'ERRO NO LOGIN'})
        if (results.length === 0) return res.status(401).json({error: "Usuario não encontrado"})

        const user = results[0];

        bcrypt.compare(senha, user.senha, (err, match) => {
            if (err) return res.status(500).json({error: "Erro ao verificar senha"})
            if (!match) return res.status(401).json({error: 'Senha Incorreta'})

            res.json({message: "Login Realizado com sucesso"})
        });
    });
});


const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`)
})
