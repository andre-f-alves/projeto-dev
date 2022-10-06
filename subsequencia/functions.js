function findLongestWord(array) { // -> Encontra a palavra mais longa
    let longestWord = '';
    
    for (let element of array) {
        if (element.length > longestWord.length) {
            longestWord = element;
        }
    }
    return longestWord;
}

function mapString(string) { // -> Cria um "mapa" da palavra
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