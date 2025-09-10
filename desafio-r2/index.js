const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port =  3001; 

// Middleware para o express entender JSON
app.use(express.json());

// Conexão com o banco de dados
const db = new sqlite3.Database('./meubanco.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados.');
    // Cria a tabela de usuários (se não existir)
    db.run('CREATE TABLE IF NOT EXISTS usuarios (nome TEXT, email TEXT)');
});

// Rota raiz para teste
app.get('/', (req, res) => {
    res.json({ 
        mensagem: 'Servidor funcionando!',
        endpoints: {
            'GET /': 'Status do servidor',
            'GET /cadastro': 'Info sobre cadastro',
            'POST /cadastro': 'Cadastrar usuário'
        }
    });
});

// Rota cadastro para teste no navegador
app.get('/cadastro', (req, res) => {
    res.json({ 
        mensagem: 'Endpoint /cadastro funcionando!',
        instrucoes: 'Use POST para cadastrar usuários',
        exemplo: {
            method: 'POST',
            url: '/cadastro',
            body: {
                nome: 'João Silva',
                email: 'joao@email.com'
            }
        }
    });
});

// Rota cadastro que recebe nome e email
app.post('/cadastro', (req, res) => {
    const { nome, email } = req.body;

    // Validação
    if (!nome || !email) {
        return res.status(400).json({ 
            error: 'Nome e email são obrigatórios' 
        });
    }

    const sql = `INSERT INTO usuarios (nome, email) VALUES (?, ?)`;
    db.run(sql, [nome, email], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            mensagem: 'Usuário cadastrado com sucesso!', 
            data: { nome, email },
            id: this.lastID
        });
    });
});

// Rota para listar usuários
app.get('/usuarios', (req, res) => {
    const sql = `SELECT * FROM usuarios`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ usuarios: rows });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`Teste em: http://localhost:${port}/cadastro`);
});