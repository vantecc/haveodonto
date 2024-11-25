const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');


registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

function handleCredentialResponse(response) {
    console.log("Token JWT recebido: " + response.credential);
    alert("Login realizado com sucesso!");
    // Você pode enviar o token para o backend aqui, se necessário
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "829307104738-qm9n0c3s2akt3v1h4ck20tkp35peh62v.apps.googleusercontent.com", // Substitua pelo seu Client ID
        callback: handleCredentialResponse,
        useFedCM: true, // Habilita FedCM para navegadores modernos
    });

    google.accounts.id.renderButton(
        document.querySelector(".g_id_signin"), // Seleciona o botão para renderizar
        { theme: "outline", size: "large" } // Configura o estilo do botão
    );
};
