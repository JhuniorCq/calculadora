 //Dato: Un NodeList SÍ puede usar forEach, pero un HTML Collection NO puede usar forEach
const botones = document.querySelectorAll('.boton:not(#igual):not(#borrar):not(#letraC)'); //.querySelector devuelve NodeList
const botonBorrar = document.getElementById('borrar');
const botonIgual = document.getElementById('igual');
const botonC = document.getElementById('botonC');
const resultadoParrafo = document.getElementById('resultado');

const mostrarDigitosPantalla = (evento) => {

    const botonClickeado = evento.target;
    const contenidoBoton = botonClickeado.innerText;

    if(resultadoParrafo.innerText === '0') {

        if(contenidoBoton === '.') { //Esto lo hago para que aparezca el 0 antes del "."
            console.log('presione el punto')
            resultadoParrafo.innerText = '0'+contenidoBoton;
        } else {
            resultadoParrafo.innerText = contenidoBoton;
        }

    } else {
        //Con esto cada que doy Click se cambia el Contenido del Parrafo <p> "resultado"
        resultadoParrafo.innerText = resultadoParrafo.innerText + contenidoBoton;
    }

    console.log(evento.target)
    console.log(typeof contenidoBoton, contenidoBoton)
}

const borrarDigito = () => {
    const digitosParrafo = resultadoParrafo.innerText;

    if(digitosParrafo === '0') {
        return; //Al poner así el return hago que la función ACABE cuando el Contenido del Párrafo sea 0
    }

    if(digitosParrafo.length === 1) {
        resultadoParrafo.innerText = '0';
        return;
    }

    const ultimoIndice = digitosParrafo.length - 1;
    const cadenaSinDigito = digitosParrafo.slice(0, ultimoIndice);

    resultadoParrafo.innerText = cadenaSinDigito;
}

const borrarTodo = () => {
    resultadoParrafo.innerText = '0';
}

const obtenerResultado = (evento) => {
    try {
        const digitosParrafo = resultadoParrafo.innerText;
        const resultado = eval(digitosParrafo);

        if(resultado === Infinity) { //Esto es para que cuando se quiera dividir entre 0 lo mande al CATCH
            throw new Error();
        }

        resultadoParrafo.innerText = resultado;
    } catch (error) { //No es necesario ponerle los paréntesis
        resultadoParrafo.innerText = 'Error!'

        setTimeout(() => {
            resultadoParrafo.innerText = '0'
        }, 1500);
    }
}

botones.forEach(boton => boton.addEventListener('click', mostrarDigitosPantalla));
botonIgual.addEventListener('click', obtenerResultado);
botonBorrar.addEventListener('click', borrarDigito);
botonC.addEventListener('click', borrarTodo);