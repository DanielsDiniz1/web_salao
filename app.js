// Importação do Express
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path"); // Para trabalhar com diretórios 
const port = 3000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // se for necessário, habilite cookies e credenciais
}))

// Permite ao Express lidar com dados de formulário enviados via POST
app.use(express.urlencoded({ extended: true }));
// A função 'express.urlencoded' processa os dados do formulário e os torna acessíveis via 'req.body

// For aplication/json
app.use(express.json());

// Configura o Express para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Adicionando para servir arquivos estáticos da pasta "public"
app.use("/imagens", express.static(path.join(__dirname, "imagens")));

// Pagina inicial 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

// Pagina de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
})

// Pagina de Cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cadastro.html'));
})
// Pagina de Perfil do usuario 
app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'perfil.html'))
})

// Pagina de contato
app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
})

// Função para validar a senha 
function validarSenha(senha) {
    // Rengex para validar a senha (8 a 12 caracteses, letras maiúculas e números)
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/;
    return regex.test(senha)
}

// Rota para processar o envio do formulário de cadastro (Post - manipula os dados enviados)
app.post('/cadastro', (req, res) => {
    //extrai os dados enviados no formulário usando 'req.body'
    const { nome, email, senha, confirmaSenha } = req.body;

    // Remove espaços em branco no inicio e no final das senhas 
    const senhaTrim = senha.trim();
    const confirmaSenhaTrim = confirmaSenha.trim();

    // Verifica se as senhas coincidem
    if (!validarSenha(senhaTrim)) {
        return res.json({ sucesso: false, mensagem: "As senhas  deve ter entre 8 e 12 caracteres, com pelo menos uma letra maiúscula e um número." })
    }

    // Validação simples: Verifica se asenha e a confirmação de senha são iguais
    if (senhaTrim !== confirmaSenhaTrim) {
        return res.json({ sucesso: false, mensagem: "As senhas não  coincidem. Tente novamente" })
    }
    // Simulação de salvamento de daos (aqui você pode inderis código para salvar em um banco de dados)
    console.log(`Usuario: ${nome}, Email: ${email}, Senha: ${senha}`);

    // Respode ao cliente que o cadastro foi realizado com sucesso
    return res.json({ sucesso: true, mensagem: "Cadastro realizado com sucesso!" })
})

// Tratamento de erro
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Algo deu errado!");
})

// Inicializa o servidor 
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

