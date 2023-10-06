import { Todo } from '../todos/models/todo.model'

/* Creamos un objeto que sería para filtrar todas las tareas, 
  tareas completadas, pendientes. 
  
  • Lo creo de esta manera para tener de manera más centralizadado
    los strings */
    
export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}


/* Este objeto state me va a decir qué es la información que quiero proporcionar
de manera global en la aplicación. */ 

export const state = {
    /* Creación de un arreglo y dentro de estos arreglos creamos instancias 
       concretas de la clase Todo */

    todos: [
        new Todo('Piedra del Alma'),
        new Todo('Piedra del Infinito'),
        new Todo('Piedra del Tiempo'),
    ],
    
    //Creo un filtro que quiero aplicar, todos, completados, etc.
    filter: Filters.All,

}

//Inicializamos el Store 
const initStore = () => {
    
    // Llamamos a nuestra función loadStore()
    loadStore();
    console.log('Store inicializado');
}

const loadStore = () => {
    /* Si el valor de la clave state no existe, devolvemos return y no hacemos 
       nada */ 
    if(!localStorage.getItem('state')) return; 

    /* Si tenemos el valor de la clave state entonces hacemos lo siguiente:
    
        1. Vamos a destructurar nuestro valor de la clave 'state' del localStorage que 
           es una cadena de texto JSON que está siendo convertido en un Objeto de JavaScript. 
        
        2. Si estas propiedades no existen (porque el estado almacenado está vacío), se 
           proporcionan valores predeterminados: un arreglo vacío [] para todos y 
           Filters.All para filter 
           
        3. Finalmente, los valores extraídos (todos y filter) se asignan a las propiedades
           correspondientes del objeto state de la aplicación. Esto significa que si hay un
           estado previamente guardado en el localStorage, se cargará en el estado actual de 
           la aplicación. Esto es útil para persistir el estado de la aplicación incluso 
           después de que el usuario cierre y vuelva a abrir la página.
        
        4. Tengamos en cuenta que por cada llamada de la función saveStateToLocalStorage() en cada
           modificación que hagamos se irá guardando los cambios, de esta manera se mantienen los cambios.
    */
    const { todos = [], filter = Filters.All } = JSON.parse( localStorage.getItem('state') )
    
    /*  Establecemos que mi arreglo de todos sea igual al arreglo todos que estoy destructurando de mi objeto 
        que está en mi localStorage... para que los elementos de mi arreglo de todos sean igual al que están en
        el localStorage, de esta manera cada vez que recargo la página la información se mantiene. */ 
    state.todos = todos;
    state.filter = filter;

}

/* Función para guardar en el localStorage nuestro objeto state
   El método del objeto global JSON.stringify(valor) convierte un objeto 
   en una cadena de texto JSON, practimante estamos convertiendo nuestro objeto
   state en una cadena de texto JSON */ 
const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}


//Obtener todos 
const getTodos = ( filter = Filters.All) => {

    //Usamos un switch para evaluar la expresión filter 
    switch( filter ){
        case Filters.All: 
            return [...state.todos]  /* -> Me retornas todo el arreglo de todos.
                                           si retorna el switch, termina ahí, por eso
                                           no usamos break en este caso. */

        case Filters.Completed:
            return state.todos.filter(todo => todo.done === true);

        case Filters.Pending: 
            return state.todos.filter(todo => todo.done === false);

        //Si ingresan un filtro no válido
        default:
            throw new Error('Opción no ${filter} no es válido');
    }

}

/** Insertar nuevo todo 
 * 
 * @param {String} description 
 */
const addTodo = ( description ) => {
    //Verificamos si nos han mandado la descripción
    if (!description) throw new Error('Descripción es requerido');

    //Si nos pasa la descripción, insertamos en el arreglo de todos uno nuevo:
    state.todos.push(new Todo(description));

    // Llamamos nuestro método porque al agregar un todo quiero que se mantenga en 
    // en localStorage
    saveStateToLocalStorage();
}


/**
 * 
 * @param {String} todoId  TODO identificador
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        //Evaluamos si el todo.id es el mismo que me están pasando por parámetro
        if( todo.id === todoId){
            /* Si lo es, entonces el todo.done será igual al valor inverso del 
               todo.done del todo que estamos pasando por parámetro. */ 
            todo.done = !todo.done;
        }

        //Regresamos el todo 
        return todo;
    });

    // Llamamos nuestro método porque al cambiar el atributo done del Todo quiero
    // que se mantenga en el localStorage
    saveStateToLocalStorage();

}

/** Esta función nos permitirá eliminar un TODO
 * 
 * @param {String} todoId TODO identificador
 */
const deleteTodo = ( todoId ) => {
    if(!todoId) throw new Error('Id es requerido')

    /* state.todos será igual a state.todos en su método filter 
      que evalúa si el todo.id es diferente al parametro todoId que le pasemos */ 
    state.todos = state.todos.filter(todo => todo.id !== todoId)

    // Llamamos nuestro método para que al eliminar el Todo quiero
    // que se mantenga en el localStorage
    saveStateToLocalStorage();

}


//Esta función nos permitirá eliminar todos los TODO completados.
const deleteCompleted = () => {
    //Regresaremos todos los TODO´s que no están marcados como terminados 
    state.todos = state.todos.filter(todo => todo.done !== true); //!todo.done

    // Llamamos nuestro método
    saveStateToLocalStorage();

}


/**
 * Crear el filtro seleccionado para el TODO, por defecto estará en All 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    
    state.filter = newFilter;

    // Llamamos nuestro método para que al establecer el filtro se mantenga 
    // en nuestro localStorage
    saveStateToLocalStorage();

}

/* Función que nos permite saber cuál es el filtro seleccionado, porque yo no 
quiero exponer el state al exterior, recordemos en js todos los objetos pasan
por referencia, entonces al exponer el objeto lo que yo haría indirectamente
que cualquier persona pueda modificar el objeto state y manipular la data 
del store */ 

const getCurrentFilter = () => {
    return state.filter;
}




//Exportamos por defecto 
export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,

}

