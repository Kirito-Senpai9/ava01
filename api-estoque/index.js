const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
const host = '192.168.1.129';

app.use(cors());
app.use(express.json());

// Lista em memória para armazenar os produtos
let produtos = [
  { id: 1, nome: 'Teclado Mec\u00e2nico', quantidade: 25, preco: 350.50 }
];

// Retorna todos os produtos
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// Retorna um produto por ID
app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);
  if (!produto) {
    return res.status(404).json({ message: 'Produto n\u00e3o encontrado.' });
  }
  res.json(produto);
});

// Adiciona um novo produto
app.post('/produtos', (req, res) => {
  const { nome, quantidade, preco } = req.body;
  if (nome === undefined || quantidade === undefined || preco === undefined) {
    return res.status(400).json({ message: 'Campos nome, quantidade e preco s\u00e3o obrigat\u00f3rios.' });
  }
  const novoProduto = {
    id: Date.now(),
    nome,
    quantidade: Number(quantidade),
    preco: Number(preco)
  };
  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// Atualiza um produto existente
app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, quantidade, preco } = req.body;
  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Produto n\u00e3o encontrado.' });
  }
  produtos[index] = { id, nome, quantidade: Number(quantidade), preco: Number(preco) };
  res.json(produtos[index]);
});

// Remove um produto
app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Produto n\u00e3o encontrado.' });
  }
  produtos.splice(index, 1);
  res.status(204).send();
});

app.listen(port, host, () => {
  console.log(`Servidor da API rodando em http://${host}:${port}`);
});
