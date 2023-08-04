/* Criando função para limpar o Formulário */
const limparFormulario = (endereco) => {
    /* Usando funções do DOM(Document Objet Modul) */
    document.getElementById('endereco').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}

/* Popular o formulário */
const preencherFormulario = (endereco) => {
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

/* validando o CEP REGX*/
const eNumero = (numero) => /^[0-9]+$/;

/* Validando CEP se tem 8 Caractéries */
const cepValido = (cep) => cep.length == 8 && eNumero(numero);

/* Fazendo uma requisição para API viaCEP */

const pesquisaCEP = async () => {
    limparFormulario();

    const cep = document.getElementById('cep').value.replace("-", "");
    const url = `https://viacep.com.br/ws/${cep}/json/`;


    /* Verificando se o CEP é válido */
    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('endereco').value = 'CEP não encontrado!';
        } else {
            preencherFormulario(endereco);
        }

    } else {
        document.getElementById('endereco').value = 'CEP incorreto';
    }

}

document.getElementById('endereco')
    .addEventListener('focusout', pesquisaCEP);














