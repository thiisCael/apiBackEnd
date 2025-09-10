
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3002; // Outra porta para não dar conflito

app.use(express.json());

const db = new sqlite3.Database('./meubanco.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados.');
    db.run('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT)');
});

// --- ROTAS DO CRUD ---

// CREATE (Criar)
app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;
    db.run(`INSERT INTO usuarios (nome, email) VALUES (?, ?)`, [nome, email], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
});

// READ (Ler)
app.get('/usuarios', (req, res) => {
    db.all("SELECT * FROM usuarios", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ usuarios: rows });
    });
});

// UPDATE (Atualizar)
app.put('/usuarios/:id', (req, res) => {
    const { nome, email } = req.body;
    const { id } = req.params;
    db.run(`UPDATE usuarios SET nome = ?, email = ? WHERE id = ?`, [nome, email, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ changes: this.changes });
    });
});

// DELETE (Deletar)
app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM usuarios WHERE id = ?`, id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });

    // Adicione esta rota após o GET /usuarios
app.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM usuarios WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(row);
    });
});
});

app.listen(port, () => {
    console.log(`Servidor do Desafio R3 rodando em http://localhost:${port}`);
});