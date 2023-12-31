 //Dato: Un NodeList SÍ puede usar forEach, pero un HTML Collection NO puede usar forEach
const botones = document.querySelectorAll('.boton:not(#igual):not(#borrar):not(#letraC)'); //.querySelector devuelve NodeList
const botonBorrar = document.getElementById('borrar');
const botonIgual = document.getElementById('igual');
const botonC = document.getElementById('botonC');
const resultadoParrafo = document.getElementById('resultado');

const operadoresArray = ['/', '*', '+', '-']; // Este Array será usado para verificar si el botón presionado es un Operador

let igualPresionado = false; //Esto me servirá para verificar si se ha presionado el botón IGUAL

const mostrarDigitosPantalla = (evento) => {

    const botonClickeado = evento.target;
    const contenidoBoton = botonClickeado.innerText;

    //Este if anidado me asegura que si Luego de haber presionado el IGUAL presiono cualquier otro botón que sea diferente de los OPERADORES,
    //entonces el valor que estaba en Pantalla se cambiará al Valor del Botón presionado (.,0,1,2,3,4,5,6,7,8,9)
    if(igualPresionado) {

        igualPresionado = false;

        //Este includes VERIFICARÁ si el Botón Presionado es alguno de los Operadores, si es así devolverá true y sino false
        const botonCoincideOperador = operadoresArray.includes(contenidoBoton);

        if(!botonCoincideOperador) {
            //En caso el Botón Presionado NO sea ningún Operador -> debió haber sido un número entre el 0 y 9, por lo que se Limpiará la pantalla
            resultadoParrafo.innerText = '';
        }
    }    

    if(resultadoParrafo.innerText === '0') {

        const signosArray = operadoresArray.concat('.'); // Este Array será usado para verificar si el botón presionado es uno de los Signos
        const botonCoincideSigno = signosArray.includes(contenidoBoton);

        if(botonCoincideSigno) { //Esto lo hago para que el 0 pueda aparecer antes del [. , / , * , + , -]
            resultadoParrafo.innerText = '0'+contenidoBoton;
        } else {
            resultadoParrafo.innerText = contenidoBoton;
        }

    } else {
        //Con esto cada que doy Click se cambia el Contenido del Parrafo <p> "resultado"
        resultadoParrafo.innerText = resultadoParrafo.innerText + contenidoBoton;
    }
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
        igualPresionado = true;
        
        const digitosParrafo = resultadoParrafo.innerText;
        const resultado = eval(digitosParrafo);

        if(resultado === Infinity || resultado === NaN) { //Esto es para que cuando se quiera dividir entre 0 lo mande al CATCH
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