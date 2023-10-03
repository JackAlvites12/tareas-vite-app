import { Todo } from "../models/todo.model";
import { createTodoHTML } from "./create-todo-html";


//Optimizaciones: 
let element; 

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */

export const renderTodos = ( elementId, todos = [] ) => {
    
    //Si mi element no existe entonces ejecuta lo que tienes dentro
    if(!element){
        //Referencia TODO, seleccionamos el parámetro elementId que sería 
        //el contenedor div con la clase '.todo-list'
        element = document.querySelector( elementId );
    }
        
    //Entonces si el elemento no existe después de hacer la anterior asignación 
    //lanzamos un throw new Error()
    if(!element) throw new Error(`Element ${elementId} desconocido`);

    element.innerHTML = '';
    
    //Vamos a barrer cada elemento de nuestro arreglo de 
    //todos y crearme ese Todo 
    todos.forEach( todo => {
        element.append( createTodoHTML(todo))
    });

}