// Importação do Express
const express = require("express");
const app = express();
const path = require("path"); // Para trabalhar com diretórios 
const port = 3000;

// Configura o Express para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));


// Pagina de Cadastro
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastro.html'));
})

//pagina de agendamento 
app.get('/agendamento', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'agendamemto'));
})

// Pagina de contato
app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato'));
})

// Pagina de Perfil do usuario 
app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, ' views', 'perfil'))
})

// Define a rota principal para servir o arquivo HTML
//app.get('/index', (req, res) => {
//    res.sendFile(path.join(__dirname, 'views', 'index.html'));
//})

// Inicializa o servidor 
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

