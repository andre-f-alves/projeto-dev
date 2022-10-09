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

const isValid = valor => valor != '' ? true : false; // -> Varifica se o valor não é uma string vazia

const notInList = (item, array) => array.indexOf(item) == -1 ? true : false; // -> Analisa se o valor existe na lista

function adicionar() { // -> Função para adiconar os valores à lista
    
    if (isValid(principal.value) && isValid(palavra.value) && notInList(palavra.value, listaDePalavras)) { // -> Valida a palavra

        let str = String(palavra.value);
        listaDePalavras.push(str); // -> Adiciona a palavra a um array

        let item = document.createElement('option'); // -> Cria o elemento '<option>' no documento HTML

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

function analisar() { // -> Função para analisar se as palavras indicadas são subsequências da palavra principal

    let mapaStr = mapString(principal.value); // -> Cria um "mapa" da palavra principal
    let listaSubsequencia = [];

    for (let palavra of listaDePalavras) { // -> Percorre todas as palavras da lista de possíveis subsequências
        
        if (isSubsequence(palavra, mapaStr)) { // -> Verifica se a palavra é uma subsequência
            
            listaSubsequencia.push(palavra); // -> Adiciona a palavra à lista de subsequências
        };
    };

    if (listaSubsequencia.length) { // -> Verifica se existem palavras dentro do array

        let ul = document.createElement('ul'); // -> Cria o elemento '<ul>' no documento HTML
        let maiorSubsequencia = findLongestWord(listaSubsequencia); // -> Procura a palavra mais longa na lista

        resultado.innerHTML += `<p>Subsequências da palavra "${principal.value}":</p>`;

        resultado.appendChild(ul); // -> Adiciona o elemento '<ul>' ao elemento '<div>'
        
        for (let palavra of listaSubsequencia) { // -> Percorre a lista de palavras
            
            let li = document.createElement('li'); // -> Cria um elemento '<li>' no documento HTML
            let liText = document.createTextNode(palavra); // -> Cria um texto

            li.appendChild(liText); // -> Adiciona o texto ao elemento '<li>'
            ul.appendChild(li); // -> Adiciona o elemento '<li>' ao elemento '<ul>'
        };
        
        resultado.innerHTML += `<p>A subsequência mais longa é ${maiorSubsequencia}.</p>`;
    
    } else { // -> Apresenta uma mensagem secundária caso não haja subsequências
        resultado.innerHTML = `<p>Nenhuma das palavras indicadas é uma subsequência de "${principal.value}".</p>`;
    };
};

botaoAdicionar.addEventListener('click', adicionar);
botaoAnalisar.addEventListener('click', analisar);