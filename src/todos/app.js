
/**
 * 
 * @param {String} elementId 
 */

/* Esta función creará la aplicación, es decir va a crear todo lo que nosotros 
   queremos renderizar en pantalla */ 

export const App = ( elementId ) => {

    //Cuando la función App() se llama
    (()=>{
        //En nuestro HTML nos creamos un elemento div
        const app = document.createElement('div');
        //Dentro de ese div le añadimos un elemento h1
        app.innerHTML = '<h1>Hola Mundo</h1>';
        //De nuestro HTML seleccionamos el elemento que le pasemos como 
        //parámetro y le añadimos el div que tiene dentro un h1
        document.querySelector(elementId).append( app );
    })();

}