const express = require('express')
const app = express()
const port = 3000;

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
  res.send(mensagens)
})

app.get('/mensagens/:id', (req,res) => {
  const id = (req.params.id) - 1
  const mensagem = mensagens[id]

  res.send(mensagem)
})





app.listen(port, () => {
  console.info(`App rodando em http://localhost:${port}` )
})