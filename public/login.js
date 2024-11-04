// Captura o formulário de login
const loginForm = document.querySelector("#loginForm");

// Captura a div para exibir mensgem de erro
const mensagemErro = document.querySelector("#mensagemErro");

// Captura a divi para exibir mensagem de Boas-Vindas
const boasVindas = document.querySelector("#boasVindas");

// Função para exibir a mensagem de boas-vindas
function exibirBoasVindas(name) {
    boasVindas.textContent = `Seja bem-vindo, ${name}`
}

// Ouvinte de evento para o submit do formulário
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Captura os valores dos campos de email e senha
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    // Limpa mensagens de erri anteriores
    mensagemErro.textContent = "";

    // Validação básica: verifica se os campos não estão vazios
    if (email === "" || senha === "") {
        mensagemErro.textContent = "Por favor, preencha todos os campos";
        setTimeout(() => {
            mensagemErro.textContent = ""
        }, 3000);
    } else {
        // Se os dados estiverem válidos, envie a requisição ao servidor
        const formData = new FormData(loginForm);
        const params = new URLSearchParams(formData).toString();

        // Requisição  http ao javascript
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded", // Corrigindo o cabeçalho
            },
            body: params, // Envia os dados do formulário
        })
            .then(response => response.json())
            .then(data => {
                if (data.sucesso) {
                    console.log("Login realizado com sucesso");
                } else {
                    mensagemErro.textContent = data.mensagem
                }
            })
            .catch(erro => {
                mensagemErro.textContent = "Ocorreu um erro na requisição";
                console.error("erro:", erro)
            });
    }
})
document.addEventListener("DOMContentLoaded", function () {
    const titulo = document.querySelector("#titulo");
    titulo.textContent = "Seja Bem Vindo"
})

// Manipulando Css

