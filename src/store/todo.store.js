import { Todo } from '../todos/models/todo.model'

/* Creamos un objeto que sería para filtrar todas las tareas, 
  tareas completadas, pendientes. 
  
  • Lo creo de esta manera para tener de manera más centralizadado
    los strings */
    
const Filters = {
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
    console.log(state);
    console.log('Store inicializado');
}

//Si alguien lo llega a llamar saltará un error en consola 
const loadStore = () => {
    throw new Error('Método No implementado');
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
            return state.todos.filter(todo => todo.done === 'true');

        case Filters.Pending: 
            return state.todos.filter(todo => todo.done === 'false');

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
}

//Necesitamos saber qué TODO está implementado, pendiente, etc. para ello nos 
//guiaremos del atributo done del TODO 
/**
 * 
 * @param {String} todoId  TODO identificador
 */
const toggleTodo = ( todoId ) => {
    state.todos = state.todos.map( todo => {
        //Evaluamos si el todo.id es el mismo que me están pasando por parámetro
        if( todo.id === todoId){
            //Si lo es, entonces el todo.done será igual al valor inverso del 
            //todo.done del todo que estamos pasando por parámetro.
            todo.done = !todo.done;
        }

        //Regresamos el todo 
        return todo;
    })
}

/** Esta función nos permitirá un TODO
 * 
 * @param {String} todoId TODO identificador
 */
const deleteTodo = ( todoId ) => {
    if(!todoId) throw new Error('Id es requerido')

    //state.todos será igual a state.todos en su método filter 
    //que evalúa si el todo.id es diferente al parametro todoId que le pasemos
    state.todos = state.todos.filter(todo => todo.id !== todoId)
}

//Esta función nos permitirá eliminar todos los TODO completados.
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => todo.done === 'true');

}


/**
 * Crear el filtro seleccionado para el TODO, por defecto estará en All 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    
    state.filter = newFilter;
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

