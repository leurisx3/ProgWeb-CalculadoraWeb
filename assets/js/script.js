class Calculator {
    constructor(operacionAnteriorTexto, operacionActualTexto) {
        this.operacionAnteriorTexto = operacionAnteriorTexto
        this.operacionActualTexto = operacionActualTexto
        this.limpiarTodo()
    }

    limpiarTodo() {
        this.operacionAnterior = ''
        this.operacionActual = ''
        this.operacion = undefined
    }

    borrarNumero() {
        this.operacionActual = this.operacionActual.toString().slice(0, -1)
    }

    agregarNumero(numero) {
        if (numero === '.' && this.operacionActual.includes('.')) return
        this.operacionActual = this.operacionActual.toString() + numero.toString()
    }

    elejirOperacion(operacion) {
        if (this.operacionActual === '') return
        if (this.operacionAnterior !== '') {
            this.computar()
        }
        this.operacion = operacion
        this.operacionAnterior = this.operacionActual
        this.operacionActual = ''
    }

    computar() {
        let computacion
        const anterior = parseFloat(this.operacionAnterior)
        const actual = parseFloat(this.operacionActual)
        if (isNaN(anterior) || isNaN(actual)) return
        switch (this.operacion) {
            case '+':
                computacion = anterior + actual
                break
            case '-':
                computacion = anterior - actual
                break
            case '*':
                computacion = anterior * actual
                break
            case '÷':
                computacion = anterior / actual
                break
            default:
                return
        }
        this.operacionActual = computacion
        this.operacion = undefined
        this.operacionAnterior = ''
        return computacion
    }

    getDisplayNumber(numero) {
        const stringNumero = numero.toString()
        const digitosInt = parseFloat(stringNumero.split('.')[0])
        const digitosDecimales = stringNumero.split('.')[1]
        let intDisplay
        if (isNaN(digitosInt)) {
            intDisplay = ''
        } else {
            intDisplay = digitosInt.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (digitosDecimales != null) {
            return `${intDisplay}.${digitosDecimales}`
        } else {
            return intDisplay
        }
    }

    actualizarPantalla() {
        this.operacionActualTexto.innerText =
            this.getDisplayNumber(this.operacionActual)
        if (this.operacion != null) {
            this.operacionAnteriorTexto.innerText =
                `${this.getDisplayNumber(this.operacionAnterior)} ${this.operacion}`
        } else {
            this.operacionAnteriorTexto.innerText = ''
        }
    }
}

const numeros = document.querySelectorAll('[dato-numero]')
const operadores = document.querySelectorAll('[dato-operar]')
const resultado = document.querySelector('[dato-resultado]')
const borrar = document.querySelector('[dato-borrar]')
const limpiar = document.querySelector('[dato-limpiar]')
const operacionAnteriorTexto = document.querySelector('[dato-operador-anterior]')
const operacionActualTexto = document.querySelector('[dato-operador-actual]')
const resultadoGuardadoEnLocalStorage = localStorage.getItem('resultadoGuardado')

const calculator = new Calculator(operacionAnteriorTexto, operacionActualTexto)

const resultadoCalculado = calculator.operacionActual.toString()

numeros.forEach(boton => {
    boton.addEventListener('click', () => {
        calculator.agregarNumero(boton.innerText)
        calculator.actualizarPantalla()
    })
})

operadores.forEach(boton => {
    boton.addEventListener('click', () => {
        calculator.elejirOperacion(boton.innerText)
        calculator.actualizarPantalla()
    })
})


resultado.addEventListener('click', boton => {
    calculator.computar()
    salvarResultadoToLocalStorage()
    calculator.actualizarPantalla()
})

limpiar.addEventListener('click', boton => {
    calculator.limpiarTodo()
    calculator.actualizarPantalla()
})

borrar.addEventListener('click', boton => {
    calculator.borrarNumero()
    calculator.actualizarPantalla()
})

const salvarResultadoToLocalStorage = () => {
    localStorage.setItem('resultadoGuardado', calculator.operacionActual)
}
