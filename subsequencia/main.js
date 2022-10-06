var principal = document.querySelector('input#principal');
var palavra = document.querySelector('input#subsequence');
var lista = document.querySelector('select#lista');
var resultado = document.querySelector('div#result');
var listaDePalavras = [];

const isValid = valor => valor != '' ? true : false; // -> Varifica se o valor não é uma string vazia

const notInList = (item, array) => array.indexOf(item) == -1 ? true : false; // -> Analisa se o valor existe na lista

function findLongestWord(array) { // -> Encontra a palavra mais longa em um array
    let longestWord = '';
    
    for (let element of array) { // -> Percorre todo o array
        if (element.length > longestWord.length) {
            longestWord = element;
        };
    };
    return longestWord;
};

function mapString(string) { // -> Cria um objeto com as letras da palavra e seus respectivos índices
    let map = {};
    
    for (let i = 0; i < string.length; i++) {
        let letter = string[i];

        if (map[letter]) { // -> Adiciona o índice da letra na propriedade se esta já existir
            map[letter].push(i);

        } else { // -> Cria uma propriedade a partir da letra e atribui um array com seu índice
            map[letter] = [i];
        };
    };
    return map;
};

function isSubsequence(string, object) { // -> Analisa se a palavra possui letras presentes no objeto
    let minIndex = 0;
    
    for (let letter of string) { // -> Percorre por todas as letras da palavra
        
        if (object[letter]) { // -> Verifica se o objeto possui uma propriedade com a mesma letra
            minIndex = findNextIndex(object[letter], minIndex); // -> Compara as posições das letras com o índice mínimo (minIndex), atribuindo ao minIndex o valor retornado pela função

            if (minIndex == false) { // -> Verifica se minIndex é falso
                return false; // -> A palavra não é uma subsequência
            };
        
        } else { // -> Se o objeto não possui a prorpiedade...
            return false; // -> a palavra não é uma subsequência
        };
    };
    return true;
};

function findNextIndex(array, minIndex) { // -> Compara os índices do array com um índice mínimo (minIndex)
    for (let index of array) { // -> Percorre os índices do array
        
        if (index >= minIndex) { // -> Verifica se o índice é maior ou igual ao minIndex (inicialmente igual a 0)
            return index + 1; // -> Retorna o índice incrementado
        };
    };
    return false; // -> Indica que o resultado da comparação é falso
};

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

    } else { // -> Alerta o erro 
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
        resultado.innerHTML = `<p>Subsequências da palavra "${principal.value}":</p>`;

        for (let palavra of listaSubsequencia) {
            resultado.innerHTML += `-${palavra}<br>`;
        };
        
        let maiorSubsequencia = findLongestWord(listaSubsequencia);

        resultado.innerHTML += `<p>A subsequência mais longa é ${maiorSubsequencia}.</p>`;
    
    } else {
        resultado.innerHTML = `<p>Nenhuma das palavras indicadas é uma subsequência de "${principal.value}".</p>`;
    };
};