import {
    findLongestWord, mapString, isSubsequence
} from './functions.js';

// Área de definição de variáveis globais

var principal = document.querySelector('input#principal');

var botaoAdicionar = document.querySelector('input#adicionar');

var palavra = document.querySelector('input#subsequence');

var botaoAnalisar = document.querySelector('input#analisar');

var lista = document.querySelector('select#lista');

var resultado = document.querySelector('div#result');

var listaDePalavras = [];

// Área de funções

const isValid = valor => valor != '' ? true : false; // -> Varifica se o valor não é uma string vazia

const notInList = (item, array) => array.indexOf(item) == -1 ? true : false; // -> Analisa se o valor existe na lista

function adicionar() { // -> Adicona o valor à lista
    
    if (isValid(principal.value) && isValid(palavra.value) && notInList(palavra.value, listaDePalavras)) { // -> Valida a palavra

        let str = String(palavra.value);
        listaDePalavras.push(str); // -> Adiciona a palavra a um array

        let item = document.createElement('option'); // -> Cria o elemento '<option>' na HTML

        for (let index in listaDePalavras) { // -> Adiciona o índice do item como valor ao atributo 'value' de '<option>'
            item.value = `item${index}`;
        };

        item.text = palavra.value;
        lista.appendChild(item); // -> Adiciona a tag '<option>' ao '<select>'

        resultado.innerHTML = '';

    } else { // -> Dispara um alerta em caso de erro
        alert('[ERRO] Valor inválido ou já encontrado na lista!');
    };

    palavra.value = ''; // -> Limpa o campo para digitação
    palavra.focus(); // -> Foca o cursor no campo
};

function analisar() { // -> Analisa se as palavras indicadas são subsequências da palavra principal

    let mapaStr = mapString(principal.value); // -> Cria um "mapa" da palavra principal
    let listaSubsequencia = [];

    for (let palavra of listaDePalavras) { // -> Percorre todas as palavras da lista de possíveis subsequências
        
        if (isSubsequence(palavra, mapaStr)) { // -> Verifica se a palavra é uma subsequência
            
            listaSubsequencia.push(palavra); // -> Adiciona a palavra à lista de subsequências
        };
    };

    if (listaSubsequencia.length) {

        let ul = document.createElement('ul');
        let maiorSubsequencia = findLongestWord(listaSubsequencia);

        resultado.innerHTML += `<p>Subsequências da palavra "${principal.value}":</p>`;

        resultado.appendChild(ul);
        
        // REQUER MODIFICAÇÃO
        for (let palavra of listaSubsequencia) {
            let li = document.createElement('li');
            
            li.text = palavra; /* -> O conteúdo deve ser inserido no elemento */ 
            ul.appendChild(li);
        };
        
        resultado.innerHTML += `<p>A subsequência mais longa é ${maiorSubsequencia}.</p>`;
    
    } else {
        resultado.innerHTML = `<p>Nenhuma das palavras indicadas é uma subsequência de "${principal.value}".</p>`;
    };
};

botaoAdicionar.addEventListener('click', adicionar);
botaoAnalisar.addEventListener('click', analisar);