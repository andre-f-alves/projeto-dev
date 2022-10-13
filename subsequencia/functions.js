function findLongestWord(array) {
    /*
    Percorre por todo o array em busca da maior palavra contida nele. Para isso, inicialmente uma variável
    (longestWord) é declarada e uma string vazia é atribuída a ela. Depois, cada palavra dentro do array é
    comparada com a variável 'longestWord' e, se a palavra for maior do que o valor dentro de 'longestWord',
    'longestWord' passa a ter o valor da palavra em questão.

    Parâmetros
    =-=-=-=-=-=-=-=
    array: recebe o array (lista) com as palavras que serão analisadas.

    Retorno
    =-=-=-=-=-=-=-=
    Retorna a variável 'longestWord' com a maior palavra encontrada no array.
    */
    let longestWord = '';
    
    for (let element of array) {
        if (element.length > longestWord.length) {
            longestWord = element;
        }
    }
    return longestWord;
}

function mapString(string) {
    /*
    Cria um "mapa" de uma palavra, ou seja, um objeto com base nas letras e em suas posições na palavra.
    */
    let map = {};
    
    for (let i = 0; i < string.length; i++) {
        let letter = string[i];

        if (map[letter]) { // -> Adiciona o índice da letra na propriedade se esta já existir
            map[letter].push(i);

        } else { // -> Cria a propriedade a partir da letra e atribui um array com seu índice
            map[letter] = [i];
        }
    }
    return map;
}

function isSubsequence(string, object) { // -> Analisa se a palavra possui letras presentes no objeto
    let minIndex = 0;
    
    for (let letter of string) {
        
        if (object[letter]) {
            minIndex = findNextIndex(object[letter], minIndex);

            if (minIndex == false) {
                return false;
            }
        
        } else {
            return false;
        }
    }
    return true;
}

function findNextIndex(array, minIndex) {
    for (let index of array) {
        
        if (index >= minIndex) {
            return index + 1;
        }
    }
    return false;
}

export { findLongestWord, mapString, isSubsequence };