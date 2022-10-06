import { soma } from './soma.mjs'

var n1 = document.querySelector('input#num1')
var n2 = document.querySelector('input#num2')
var resultado = document.querySelector('p#resultado')

function somar() {
    let num1 = Number(n1)
    let num2 = Number(n2)

    let sum = soma(num1, num2)
    resultado.innerText = `A soma entre ${num1} e ${num2} é igual a ${sum}`
}