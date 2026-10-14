const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// 1. Sua String de Conexão obtida diretamente no MongoDB Compass
const url = 'mongodb://localhost:27017'; 
const client = new MongoClient(url);

const dbName = 'PEPGH';

async function conectarBanco() {
    try {
        await client.connect();
        console.log('Conectado com sucesso ao MongoDB Compass!');
    } catch (erro) {
        console.error('Erro ao conectar ao MongoDB:', erro);
    }
}
conectarBanco();

// 2. Rota que recebe os dados do formulário HTML
app.post('/enviar', async (req, res) => {
    try {
        const db = client.db(dbName);
        const colecao = db.collection('usuarios');
        
        // Dados vindos do formulário HTML
        const novoUsuario = { nome: req.body.nome };
        
        // Insere o documento no MongoDB
        await colecao.insertOne(novoUsuario);
        
        res.send('Dados salvos com sucesso no MongoDB Compass!');
    } catch (erro) {
        res.status(500).send('Erro ao salvar os dados.');
    }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
