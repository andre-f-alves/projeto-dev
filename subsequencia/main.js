import {
    findLongestWord, mapString, isSubsequence
} from './functions.js';

/*
    Área de definição de variáveis globais
*/

var principal = document.querySelector('input#principal');

var botaoAdicionar = document.querySelector('input#adicionar');

var palavra = document.querySelector('input#subsequence');

var botaoAnalisar = document.querySelector('input#analisar');

var lista = document.querySelector('select#lista');

var resultado = document.querySelector('div#result');

var listaDePalavras = [];

/*
    Área de funções
*/

const isValid = valor => valor != '' ? true : false; // Verifica se um valor não é uma string vazia

const notInList = (item, array) => array.indexOf(item) == -1 ? true : false; // Analisa se um valor existe dentro de um array

function adicionar() {
    /*
    Função acionada com o evento 'onclick'.
    
    Valida os valores inseridos nos campos 'input#principal' e 'input#subsequence', verificando
    se estes não são strings vazias e se o valor de 'input#subsequence' não está na lista.
    
    Após a validação, caso o resultado seja 'true', o valor de 'input#subsequence' é adicionado à lista
    e exibido na lista de seleção ('select#lista') por meio da criação e adição de um elemento '<option>'
    ao '<select>' para cada valor inserido.

    Caso a validação resulte em 'false', um alerta de erro é disparado.
    */

    if (isValid(principal.value) && isValid(palavra.value) && notInList(palavra.value, listaDePalavras)) {

        let str = String(palavra.value);
        listaDePalavras.push(str);

        let item = document.createElement('option');

        for (let index in listaDePalavras) {
            /* 
            Percorre pelos índices do array 'listaDePalavras', atribuindo à propriedade 'value' do elemento
            HTML '<option>' o índice de cada palavra do array precedido de "item".
            */
            item.value = `item${index}`;
        };

        item.text = palavra.value;
        lista.appendChild(item);

        resultado.innerHTML = '';

    } else {
        alert('[ERRO] Valor inválido ou já encontrado na lista!');
    };

    palavra.value = '';
    palavra.focus();
};

function analisar() {
    /*
    Função acionada com o evento 'onclick'.
    
    Analisa as palavras inseridas no campo 'input#subsequence', verificando se estas são subsequências
    da palavra principal, inserida no campo 'input#principal'.

    Para realizar a análise, um "mapa", ou seja, um objeto (Object), é criado com base na palavra principal.
    Cada letra da palavra é transformada em uma propriedade do objeto e, como valor para a propriedade,
    é atribuído um array com o índice, ou posição, em que a letra se encontra*.

    Após a criação do mapa, cada palavra do array 'listaDePalavras' é comparada com os valores das propriedades
    do objeto criado, verificando se o índice das letras da palavra são menores ou iguais aos índices da palavra
    principal, indicando se a palavra é ou não uma subseqência da palavra principal. Caso o resultado seja 'true'
    a palavra é adicionada no array 'listaSeubsequencia'.

    Uma vez concluído todo o processo de análise, é realizada uma validação que indica se o array 'listaSubsequencia'
    possui valores dentro de si, ou seja, se não é um array vazio. Caso a validação resulte em 'true', é feita uma
    pesquisa no array 'listaSubsequencia' com o objetivo de capturar a subsequência mais longa e os resultados são
    exibidos. Caso a validação resulte em 'false', uma mensagem secundária é exibida ao usuário.

    =-=-=-=-=-=
    * Em casos de mais de uma ocorrência de uma mesma letra na palavra, haverá apenas uma propriedade a referenciando,
    mas com os índices relativos à sua ocorrência na palavra, isto é, somente seus índices serão adicinados no array.
    */

    let mapaStr = mapString(principal.value);
    let listaSubsequencia = [];

    for (let palavra of listaDePalavras) {

        if (isSubsequence(palavra, mapaStr)) {
            listaSubsequencia.push(palavra);
        };
    };

    if (listaSubsequencia.length) {

        let ul = document.createElement('ul');
        let maiorSubsequencia = findLongestWord(listaSubsequencia);

        resultado.innerHTML += `<p>Subsequências da palavra "${principal.value}":</p>`;

        resultado.appendChild(ul);
        
        for (let palavra of listaSubsequencia) {
            /*
            Percorre o array 'listaSubsequencia', transformando cada palavra em um elemento de lista ('<li>') para
            uma lista desordenada ('<ul>').
            */
            let li = document.createElement('li');
            let liText = document.createTextNode(palavra);

            li.appendChild(liText);
            ul.appendChild(li);
        };
        
        resultado.innerHTML += `<p>A subsequência mais longa é ${maiorSubsequencia}.</p>`;
    
    } else {
        resultado.innerHTML = `<p>Nenhuma das palavras indicadas é uma subsequência de "${principal.value}".</p>`;
    };
};

botaoAdicionar.addEventListener('click', adicionar);
botaoAnalisar.addEventListener('click', analisar);