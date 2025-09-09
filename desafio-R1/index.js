
const express = require('express');
const app = express();
const port = 3000;

// Um array local de produtos fictícios
const produtos = [
    { id: 1, nome: 'Placa de Vídeo', preco: 3500.00 },
    { id: 2, nome: 'Processador', preco: 2200.00 },
    { id: 3, nome: 'Memória RAM 16GB', preco: 450.00 }, 
    { id: 4, nome: 'SSD 1TB', preco: 600.00 }, 
    { id: 5, nome: 'Monitor 27"', preco: 1200.00 }, 
    { id: 6, nome: 'Teclado Mecânico', preco: 300.00 }, 
    { id: 7, nome: 'Mouse Gamer', preco: 150.00 },
    { id: 8, nome: 'Fonte 650W', preco: 400.00 }, 
    { id: 9, nome: 'Gabinete', preco: 250.00 },
    { id: 10, nome: 'Cooler', preco: 100.00 },    
];

// Rota /produtos que retorna o array como JSON
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

app.listen(port, () => {
    console.log(`Servidor do Desafio R1 rodando em http://localhost:${port}/produtos`);
});