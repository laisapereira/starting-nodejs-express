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
  {
    "id": 1,
    "texto": "Essa é a primeira mensagem"
  },
  {
    "id": 2,
    "texto": "Essa é a segunda mensagem"
  },
  {
    "id": 3,
    "texto": "Essa é a terceira mensagem"
  },
  {
    "id": 4,
    "texto": "Essa é a quarta mensagem"
  },
  {
    "id": 5,
    "texto": "Essa é a quinta mensagem"
  },
  
]

//-- [GET] /mensagens -- Retorna a lista de mensagens
app.get('/mensagens', (req, res) => {
  res.send(mensagens.filter(Boolean))
})

// -- [GET] /mensagens/{id} -- retorna apenas uma unica mensagem pelo ID

app.get('/mensagens/:id', (req,res) => {
  const id = (req.params.id) - 1
  const mensagem = mensagens[id]

  if(!mensagem) {
    res.send("Mensagem não encontrada.")
  } res.send(mensagem)
})

// -- [POST] /mensagens -- cria uma nova mensagem

app.post('/mensagens', (req,res) =>{
  const mensagem = req.body

  if (!mensagem || !mensagem.texto) { 
    res.send('Mensagem inválida') 
  }
  
  mensagem.id = mensagens.length + 1;
  mensagens.push(mensagem);

  res.send(mensagem)
})


//- [PUT] /mensagens/{id} -- Atualiza uma mensagem pelo ID 

app.put('/mensagens/:id', (req,res) => {
  const id = (req.params.id ) - 1
  const mensagem = mensagens[id]
  const novoTexto = req.body.texto
  mensagem.texto = novoTexto


  if (!novoTexto) {
    res.send('Mensagem inválida')
  }
 

  res.send(mensagem)
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