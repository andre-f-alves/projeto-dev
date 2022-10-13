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
    Cria o "mapa" de uma palavra, ou seja, define um objeto (map) e itera sobre as letras de uma palavra,
    criando propriedades a partir dessas letras e atribuindo a elas um array com suas respectivas posições
    (índices) na palavra. Caso a propriedade já exista no objeto, apenas o índice da letra é adicionado
    ao array.

    Parâmetros
    =-=-=-=-=-=-=-=
    string: recebe a palavra cujas letras serão mapeadas.

    Retorno
    =-=-=-=-=-=-=-=
    Retorna o "mapa", o objeto que contém as letras da palavra e seus respectivos índices.
    */
    let map = {};
    
    for (let i = 0; i < string.length; i++) {
        let letter = string[i];

        if (map[letter]) {
            map[letter].push(i);

        } else {
            map[letter] = [i];
        }
    }
    return map;
}

function isSubsequence(string, object) {
    /*
    Realiza uma comparação entre uma palavra e as propriedades de um objeto que contém as letras de uma
    palavra mapeadas, iterando sobre cada letra da palavra a fim de verificar se ela possui uma propriedade
    definida no objeto e se seu índice (posição de ocorrência na palavra) é manor ou igual aos índices das
    letras da palavra mapeada, guardados dentro de um array atribuído como valor às propriedades do objeto.

    Parâmetros
    =-=-=-=-=-=-=-=
    string: recebe a palavra cujas letras serão comparadas com as propriedades do objeto.
    object: recebe o objeto que contém as letras de uma palavra mapeaadas.

    Retorno
    =-=-=-=-=-=-=-=
    Retorna 'false' se o objeto não possuir uma propriedade com o mesmo nome da letra a análise os índices das
    letras forem maiores do que os valores guardados nas propriedades do objeto.
    Retorna 'true' se o objeto possuir a propriedade e se os índices das letras forem menores ou iguais aos
    valores guadados na propriedade do objeto.
    */
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