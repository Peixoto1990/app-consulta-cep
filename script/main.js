const formulario = document.getElementById("formConsulta");
const resultadoConteiner = document.querySelector(".resultadoConteiner");
const campoCep = document.getElementById("cep");
const itensLista = document.querySelectorAll(".itemListaResultado");

campoCep.setAttribute("maxlength", "8");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    if (campoCep.value.length === 8) {
        consultaCep(campoCep.value);
    } else {
        alert("Adicione um CEP de 8 caracteres.")
    }
})

campoCep.addEventListener("keyup", (event) => {
    event.target.value = event.target.value.replace(/[a-zA-Z\s\.\?\\;áÁéÉíÍóÓúÚàÀèÈìÌòÒùÙçÇ\*\+\(\)!@#$%¨&='"\|-]/g, "");
})

async function consultaCep(cep) {
    const campoErro = document.getElementById("campoErro");
    campoErro.innerHTML = "";
    const tituloResultado = document.querySelector(".tituloResultado");
    tituloResultado.innerHTML = "";
    resultadoConteiner.classList.add("resultadoConteiner--oculto");
    itensLista.forEach(elemento => elemento.innerHTML = "");
    try {
        const requisicao = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        const resultado = await requisicao.json();

        if (resultado.erro) {
            throw Error("CEP inválido. Tente novamente.");
        }

        console.log(resultado);
        resultadoConteiner.classList.remove("resultadoConteiner--oculto");
        geraResultado(resultado);
    } catch (erro) {
        console.log(erro);
        campoErro.innerHTML = erro;
    } finally {
        tituloResultado.innerHTML = "Consulta completa.";
    }
}

function geraResultado(resultado) {
    for (let contador = 0; contador < itensLista.length; contador++) {
        if (resultado[itensLista[contador].dataset.retorno]) {
            itensLista[contador].innerHTML = `${itensLista[contador].dataset.retorno}: ${resultado[itensLista[contador].dataset.retorno]}`;
        }
    }
}