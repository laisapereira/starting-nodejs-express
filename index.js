const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const port = 3000;

app.use(bodyParser.json())


app.get('/hello', (req, res) => {
  res.send('Hello World')
})


/* 
Lista de endpoints da aplicação crud de mensagens

-- [GET] /mensagens -- Retorna a lista de mensagens
-- [GET] /mensagens/{id} -- retorna apenas uma unica mensagem pelo ID
-- [POST] /mensagens -- cria uma nova mensagem
-- [PUT] /mensagens/{id} -- Atualiza uma mensagem pelo ID
-- [DELETE] /mensagens/{id} - Remover uma mensagem pelo ID

*/

const mensagens = [
  "Essa é a primeira mensagem",
  "Essa é a segunda mensagem"
]

//-- [GET] /mensagens -- Retorna a lista de mensagens
app.get('/mensagens', (req, res) => {
  res.send(mensagens.filter(Boolean))
})

// -- [GET] /mensagens/{id} -- retorna apenas uma unica mensagem pelo ID

app.get('/mensagens/:id', (req,res) => {
  const id = (req.params.id) - 1
  const mensagem = mensagens[id]

  res.send(mensagem)
})

// -- [POST] /mensagens -- cria uma nova mensagem

app.post('/mensagens', (req,res) =>{
  const mensagem = req.body.mensagem;

  mensagens.push(mensagem);

  res.send(mensagem)
})


//- [PUT] /mensagens/{id} -- Atualiza uma mensagem pelo ID 

app.put('/mensagens/:id', (req,res) => {
  const id = (req.params.id ) - 1
  const mensagem = req.body.mensagem

  mensagens[id] = mensagem

  res.send(`Mensagem atualizada com sucesso: '${mensagem}.'`)
})


// - [DELETE] /mensagens/{id} - Remover uma mensagem pelo ID

app.delete('/mensagens/:id', (req,res) => {
  const id = req.params.id - 1
  delete mensagens[id]

  res.send('Mensagem removida com sucesso.')
})


app.listen(port, () => {
  console.info(`App rodando em http://localhost:${port}` )
})