const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')
const allowedKeys = [
    '(', ')', '/', '*', '+', '-', '.', '%',
    '9', '8', '7', '6', '5', '4', '3', '2', '1', '0', ' '
]

//passa pelos buttons e add a função e click
document.querySelectorAll('.charKey').forEach(function(charKeyBtn) {
    charKeyBtn.addEventListener('click', function () {
        //atribui o valor anterior e soma com o valor atual
        const value = charKeyBtn.dataset.value
        input.value += value
    })
})

//função de apagar dados
document.getElementById('clear').addEventListener('click', function () {
    input.value = ''
    input.focus()
})

//função dos button do teclado
//possivel usar o teclado direto no input para calc
input.addEventListener('keydown', function (ev) {
    ev.preventDefault()
    //se a tecla tiver inclusa no array allowedKeys
    if (allowedKeys.includes(ev.keys)) {
        input.value += ev.key
        return
    }
    //se a tecla for backspace
    if (ev.key === 'Backspace') {
        input.value = input.value.slice(0, -1)
    }
    //se a tecla for enter
    if (ev.key === 'Enter') {
        calculate()
    }
})

//função de calc - or when clicar in button = or enter
document.getElementById('equal').addEventListener('click', calculate)
function calculate() {
    //add class 'error'
    resultInput.value = 'ERROR'
    resultInput.classList.add('error')
    //calc os values do input
    const result = eval(input.value)
    resultInput.value = result
    //remov a class 'error'
    resultInput.classList.remove('error')
}

//função do button copy
document.getElementById('copyToClipBoard').addEventListener('click', function (ev) {
    //aciona uma ação no button selecionado
    const button = ev.currentTarget
    //se o button q foi selecionado para executar uma ação tiver em seu text 'Copy'
    if (button.innerText === 'Copy') {
        button.innerText == 'Copied!'
        button.classList.add('success')
        //aciona o method de copy - navigator.clipboard.writeText() - e copy o result do resultInput
        navigator.clipboard.writeText(resultInput.value)
    } else {
        button.innerText = 'Copy'
        button.classList.remove('success')
    }
})

//função do tema
document.getElementById('themeSwitcher').addEventListener('click', function () {
    //se o tema tiver como dark, troca para o tema claro
    if (main.dataset.theme === 'dark') {
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#26834a')
        main.dataset.theme = 'light'
        //se o tema tiver como ligtht, troca para o tema escuro
    } else {
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color', '#4dff91')
        main.dataset.theme = 'dark'
    }
})