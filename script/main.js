const formulario = document.getElementById("formConsulta");
const campoCep = document.getElementById("cep");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event);
})

campoCep.addEventListener("keyup", (event) => {
    event.target.value = event.target.value.replace(/[a-zA-Z\s\.\?\\;áÁéÉíÍóÓúÚàÀèÈìÌòÒùÙçÇ\*\+\(\)!@#$%¨&='"\|]/g, "");
})

async function consultaCep(cep) {
    try {
        const requisicao = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        const resultado = await requisicao.json();

        if (resultado.erro) {
            throw Error("CEP inválido. Tente novamente.");
        }

        console.log(resultado);
    } catch (erro) {
        console.log(erro);
    } finally {
        console.log("Consulta completa.");
    }
}