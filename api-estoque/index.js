// index.js - API de Estoque (Node.js + Express)
// CRUD completo para produtos em memória.
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Estrutura do objeto produto:
// { id: 1678912345, nome: "Teclado Mecânico", quantidade: 25, preco: 350.50 }
let produtos = [
  { id: 1724160001001, nome: "Teclado Mecânico", quantidade: 25, preco: 350.50 },
  { id: 1724160001002, nome: "Mouse Gamer", quantidade: 40, preco: 129.90 },
  { id: 1724160001003, nome: "Monitor 24\"", quantidade: 10, preco: 999.00 },
];

const validarProduto = (body) => {
  const erros = [];
  if (!body || typeof body !== 'object') {
    erros.push('Corpo da requisição inválido.');
    return erros;
  }
  const { nome, quantidade, preco } = body;
  if (!nome || typeof nome !== 'string') erros.push('Campo "nome" é obrigatório e deve ser string.');
  if (quantidade === undefined || isNaN(Number(quantidade))) erros.push('Campo "quantidade" é obrigatório e deve ser numérico.');
  if (preco === undefined || isNaN(Number(preco))) erros.push('Campo "preco" é obrigatório e deve ser numérico.');
  return erros;
};

// GET /produtos: lista completa
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// GET /produtos/:id: produto específico
app.get('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find(p => p.id === id);
  if (!produto) return res.status(404).json({ erro: 'Produto não encontrado.' });
  res.json(produto);
});

// POST /produtos: cria novo
app.post('/produtos', (req, res) => {
  const erros = validarProduto(req.body);
  if (erros.length) return res.status(400).json({ erros });

  const { nome, quantidade, preco } = req.body;
  const id = Date.now(); // id simples baseado em timestamp
  const novo = { id, nome, quantidade: Number(quantidade), preco: Number(preco) };
  produtos.push(novo);
  res.status(201).json(novo);
});

// PUT /produtos/:id: atualiza
app.put('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = produtos.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ erro: 'Produto não encontrado.' });

  const erros = validarProduto(req.body);
  if (erros.length) return res.status(400).json({ erros });

  const { nome, quantidade, preco } = req.body;
  const atualizado = { id, nome, quantidade: Number(quantidade), preco: Number(preco) };
  produtos[idx] = atualizado;
  res.json(atualizado);
});

// DELETE /produtos/:id: remove
app.delete('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const lenAntes = produtos.length;
  produtos = produtos.filter(p => p.id != id);
  if (produtos.length === lenAntes) return res.status(404).json({ erro: 'Produto não encontrado.' });
  res.status(204).send();
});

app.get('/', (req, res) => res.send('Servidor da API de Estoque rodando.'));
app.listen(PORT, () => console.log(`Servidor da API rodando em http://localhost:${PORT}`));
