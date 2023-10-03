import todoStore from '../store/todo.store';
import { renderTodos } from './usecases/index';
import html from './app.html?raw';

const ElementsIDs = {
    TodoList : '.todo-list',
    NewTodoInput: '#new-todo-input',
}

/**
 *
 * @param {String} elementId
 */

/* Esta función creará la aplicación, es decir va a crear todo lo que nosotros 
   queremos renderizar en pantalla */

export const App = (elementId) => {

  //Cada vez que quiero dibujar mis TODOS voy a llamar a esta función
  const displayTodos = () => {
      const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
      renderTodos( ElementsIDs.TodoList, todos)
  }

  //Cuando la función App() se llama
  (() => {
    //En nuestro HTML nos creamos un elemento div
    const app = document.createElement("div");
    //Dentro de ese div le añadimos html
    app.innerHTML = html;

    //De nuestro HTML seleccionamos el elemento que le pasemos como
    //parámetro y le añadimos el div que tiene dentro un h1
    document.querySelector(elementId).append(app);
    displayTodos()

  })();

  // Referencias HTML
  const newDescriptionInput = document.querySelector(ElementsIDs.NewTodoInput);
  
  // Listeners
  // Vamos a escuchar un evento cuando presione y suelte una tecla, también vamos a 
  // recibir el evento
  newDescriptionInput.addEventListener('keyup', (event) => {
   
    //Preguntamos si es diferente de 13, es decir, si la tecla que presionamos no es ENTER
    //quiero que me saques del evento
    if( event.keyCode != 13) return; 

    //Sólo pasará a ejecutar la sgte bloque de código si la tecla es ENTER
    //La función trim() quita los espacios al inicio y al final de un texto
    if( event.target.value.trim().length == 0) return;

    todoStore.addTodo( event.target.value );
    displayTodos()

    //Validamos que no se repita el valor al presionar ENTER muchas veces
    //entonces despues de haberlo insertado que el valor del target sea vacío 
    //es decir, que el input se vacíe.
    event.target.value = '';
  });

};
