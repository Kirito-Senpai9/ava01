// index.js (CommonJS)
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());



// ROTA: Ler TODOS os cursos (GET /cursos)
 app.get('/cursos', async (req, res) => {
 try {
 const cursos = await knex('cursos').select('*');
 res.status(200).json(cursos);
 } catch (error) {
 res.status(500).json({ message: "Erro ao buscar cursos." });
 }
 });
// ROTA: Ler UM curso específico por ID (GET /cursos/:id)
 app.get('/cursos/:id', async (req, res) => {
 try {
 const { id } = req.params;
 const curso = await knex('cursos').where('id', id).first();
 if (!curso) {
 return res.status(404).json({ message: 'Curso não encontrado.' });
 }
 res.status(200).json(curso);
 } catch (error) {
 res.status(500).json({ message: "Erro ao buscar curso." });
 }
 });
// ROTA: Criar um novo curso (POST /cursos)
 app.post('/cursos', async (req, res) => {
 try {
 const { nome, area } = req.body;
 if (!nome || !area) {  // Validação de entrada
 return res.status(400).json({ message: 'Campos "nome" e "área" são obrigatórios.' });
 }
 const [id] = await knex('cursos').insert({ nome, area });
 res.status(201).json({ id, nome, area });
 } catch (error) {
 res.status(500).json({ message: "Erro ao criar curso." });
 }
 });
// ROTA: Atualizar um curso existente (PUT /cursos/:id)
 app.put('/cursos/:id', async (req, res) => {
 try {
 const { id } = req.params;
 const { nome, area } = req.body;
 if (!nome && !area) {  // Validação de entrada
 return res.status(400).json({ message: 'Um campo deve ser fornecido para atualização.' });
 }
 // Cria um objeto apenas com os campos que foram enviados
 const dadosParaAtualizar = {};
 if (nome) dadosParaAtualizar.nome = nome;
 if (area) dadosParaAtualizar.area = area;
 const atualizado = await knex('cursos').where('id', id).update(dadosParaAtualizar);
 if (!atualizado) {
 return res.status(404).json({ message: 'Curso não encontrado para atualização.' });
 }
 res.status(200).json({ message: "Curso atualizado com sucesso." });
 } catch (error) {
 res.status(500).json({ message: "Erro ao atualizar curso." });
 }
 });
// ROTA: Deletar um curso (DELETE /cursos/:id)
 app.delete('/cursos/:id', async (req, res) => {
 try {
 const { id } = req.params;
 const deletado = await knex('cursos').where('id', id).del();
 if (!deletado) {
 return res.status(404).json({ message: 'Curso não encontrado para exclusão.' });
 }
 // Status 204 significa sucesso, mas sem conteúdo para retornar.
 res.status(204).send();
 } catch (error) {
 res.status(500).json({ message: "Erro ao deletar curso." });
 }
 });


app.listen(port, () => {
  console.log(`Servidor da API rodando em http://localhost:${port}`);
});
