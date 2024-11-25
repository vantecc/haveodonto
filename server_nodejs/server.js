const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { OAuth2Client } = require("google-auth-library");

const app = express();
const PORT = 3000;

// Conectando ao MongoDB
mongoose.connect("mongodb://localhost:27017/usuariosDB", { useNewUrlParser: true, useUnifiedTopology: true });

// Esquema do banco de dados
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
});
const User = mongoose.model("User", userSchema);

// Configuração do body-parser
app.use(bodyParser.json());

// Configuração do Google OAuth2 Client
const CLIENT_ID = "829307104738-qm9n0c3s2akt3v1h4ck20tkp35peh62v.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// Rota para autenticação/cadastro
app.post("/google-auth", async (req, res) => {
    const { token } = req.body;

    try {
        // Validando o token com o Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const email = payload.email;
        const name = payload.name;

        // Verificando no banco se o usuário já existe
        let user = await User.findOne({ email });
        if (user) {
            // Usuário já existe
            res.status(200).json({ message: "Login realizado com sucesso!", user });
        } else {
            // Usuário não existe, criar novo
            user = new User({ name, email });
            await user.save();
            res.status(201).json({ message: "Cadastro realizado com sucesso!", user });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Erro na autenticação com Google", error });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${3000}`);
});


const cors = require("cors");

// Permitir requisições da sua página hospedada
const allowedOrigins = [
    "https://vantecc.github.io", // Adicione o domínio do seu GitHub Pages
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"], // Permitir métodos específicos
}));

