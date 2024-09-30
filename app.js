// Importação do Express
const express = require("express");
const app = express();
const path = require("path"); // Para trabalhar com diretórios 
const port = 3000;

// Permite ao Express lidar com dados de formulário enviados via POST
app.use(express.urlencoded({ extended: true }));
// A função 'express.urlencoded' processa os dados do formulário e os torna acessíveis via 'req.body

// Configura o Express para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Pagina inicial 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

// Pagina de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'viewa', 'login.html'));
})

// Pagina de Cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastro.html'));
})

// Rota para processar o envio do formulário de cadastro (Post - manipula os dados enviados)
app.post('/cadastro', (req, res) => {
    //extrai os dados enviados no formulário usando 'req.body'
    const { nome, email, senha, confirmar_senha } = req.body;

    // Validação simplres: Verifica se asenha e a confirmação de senha são iguais
    if (senha !== confirmar_senha) {
        return res.send("As senhas não coincidem. tente novamente.")
    }
    // Simulação de salvamento de daos (aqui você pode inderis código para salvar em um banco de dados)
    console.log(`Usuario: ${nome}, Email: ${email}, Senha: ${senha}`);

    // Respode ao cliente que o cadastro foi realizado com sucesso
    res.send("Cadastro realizado com sucesso!");
})
//pagina de agendamento 
app.get('/agendamento', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'agendamento.html'));
})

// Pagina de contato
app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
})

// Pagina de Perfil do usuario 
app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'perfil.html'))
})

// Define a rota principal para servir o arquivo HTML
//app.get('/index', (req, res) => {
//    res.sendFile(path.join(__dirname, 'views', 'index.html'));
//})

// Inicializa o servidor 
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

