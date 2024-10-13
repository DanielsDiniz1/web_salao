// Captura o formulário 
const form = document.querySelector("#cadastroForm");

// Captura as divs onde as  mensagens serão exibidas
const mensagemErro = document.querySelector("#mensagemErro");
const mensagemSucesso = document.querySelector("#mensagemSucesso");

// Ouvinte de evento de encio do formulário 
form.addEventListener('submit', function (event) {
    event.preventDefault(); //  Evita o envio automático do formulário 

    // Coleta dados do formulário
    const formData = new FormData(form);
    const params = new URLSearchParams(formData).toString();

    // Envia dados ao servidor usando fetch
    fetch('/cadastro', {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded',
        },
        body: params,
    })
        .then(response => response.json())
        .then(data => {
            console.log("Resposta do servido", data)
            // Limpa  as mensagens anteriores
            mensagemErro.textContent = "";
            mensagemSucesso.textContent = "";

            // Verifica se o cadastro foi um sucesso
            if (data.sucesso) {
                mensagemSucesso.textContent = data.mensagem;
                // Redireciona  após alguns segundos
                window.location.href = '/login';
            } else {
                mensagemErro.textContent = data.mensagem;
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            mensagemErro.textContent = 'Ocorreu um erro ao processar o cadastro.';
        });

});
