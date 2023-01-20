const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const port = 3000;

app.use(bodyParser.json())

const mongodb = require('mongodb');

(async () => {

const connectionString = 'mongodb://localhost:27017/mensagens_database' 

const options = { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}

const client = await mongodb.MongoClient.connect(connectionString, options);
  
console.info('Conectando ao banco de dados MongoDB')

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

const db = client.db ('mensagens_database')
const mensagens = db.collection('mensagens')

console.log(await mensagens.find({}).toArray())

function getMensagensValidas () {
    return mensagens.find({}).toArray()
}

function getMensagemById (id) {
  return getMensagensValidas().find(msg => msg.id === id)

}

//-- [GET] /mensagens -- Retorna a lista de mensagens
app.get('/mensagens', async(req, res) => {
  res.send(await getMensagensValidas())
})

// -- [GET] /mensagens/{id} -- retorna apenas uma unica mensagem pelo ID

app.get('/mensagens/:id', (req,res) => {
  const id = (+req.params.id) 

  const mensagem = getMensagemById(id)

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

  const id = (+req.params.id)

  const mensagem = getMensagemById(id)

  const novoTexto = req.body.texto

  mensagem.texto = novoTexto


  if (!novoTexto) {
    res.send('Mensagem inválida')
  }
 

  res.send(mensagem)
})


// - [DELETE] /mensagens/{id} - Remover uma mensagem pelo ID

app.delete('/mensagens/:id', (req,res) => {
  const id = +req.params.id

  const mensagem = getMensagemById(id)

  if (!mensagem) {
    res.send('Mensagem não encontrada')
  }

  const index = mensagens.indexOf(mensagem)

  delete mensagens[index]

  res.send('Mensagem removida com sucesso.')
})


app.listen(port, () => {
  console.info(`App rodando em http://localhost:${port}` )
})

})();
