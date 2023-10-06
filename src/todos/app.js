import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPendingTodos } from './usecases/index';
import html from './app.html?raw';

// Creamos un objeto para almacenar los ID´s de nuestro HTML 
const ElementsIDs = {
    ClearCompleted: '.clear-completed',
    TodoList : '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters : '.filtro',
    PendingCount : '#pending-count'
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
      renderTodos( ElementsIDs.TodoList, todos);
      updatePendingCount();
  }

  // Llamaremos esta función donde haya posibles cambios en nuestro store
  const updatePendingCount = () => {
    renderPendingTodos(ElementsIDs.PendingCount); 
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
    displayTodos();

  })();

  // Referencias HTML
  const newDescriptionInput = document.querySelector(ElementsIDs.NewTodoInput);
  const todoListUl = document.querySelector(ElementsIDs.TodoList);
  const clearCompletedButton= document.querySelector(ElementsIDs.ClearCompleted); 
  const filtersLI = document.querySelectorAll(ElementsIDs.TodoFilters); 
  // console.log(filtersLI);  -> Me regresará un arreglo porque estoy usando querySelectorAll


  /* • Listeners
      Vamos a escuchar un evento cuando presione y suelte una tecla, también vamos a 
      recibir el evento */ 
  newDescriptionInput.addEventListener('keyup', (event) => {
   
    /* Preguntamos si es diferente de 13, es decir, si la tecla que presionamos no es ENTER
      quiero que me saques del evento */ 
    if( event.keyCode != 13) return; 

    /* Sólo pasará a ejecutar la sgte bloque de código si la tecla es ENTER,
       la función trim() quita los espacios al inicio y al final de un texto 
      
       • Condicionamos si el valor que escribimos en input tiene una longitud de 0
        que me saques del evento, es decir... que no llames el valor. */
    if( event.target.value.trim().length == 0) return;

    /*  Llamamos a nuestro store en su método addTodo() y le pasamos el valor que 
       ingresemos en el input */ 
    todoStore.addTodo( event.target.value );
    displayTodos();

    //Validamos que no se repita el valor al presionar ENTER muchas veces
    //entonces despues de haberlo insertado que el valor del target sea vacío 
    //es decir, que el input se vacíe.
    event.target.value = '';
  });

  todoListUl.addEventListener('click', (event) => {
      const elementoPadre = event.target.closest('[data-id]');
      todoStore.toggleTodo(elementoPadre.getAttribute('data-id'));
      displayTodos();

  });

  todoListUl.addEventListener('click', (event) => {
    // Guardamos en una variable cuando presionamos el botón nos bote por consola 
    // que tiene className de 'destroy', entonces nos botará una expresión booleana
    const isDestroyElement = event.target.className === 'destroy';
    const elementoPadre = event.target.closest('[data-id]');

    // Si el botón X que presionamos no tiene la clase 'destroy' y el elemento padre
    // no tiene el atributo data-id entonces que me saque del evento y no haga nada
    if(!elementoPadre || !isDestroyElement ) return;

    // Si el botón X que presionamos tiene la clase 'destroy' entonces llamamos al método deleteTodo()
    // y le pasamos como ID el valor del atributo data-id
    todoStore.deleteTodo(elementoPadre.getAttribute('data-id'));
    // Renderizamos los TODO´s
    displayTodos();

  });

  clearCompletedButton.addEventListener('click', () => {
     todoStore.deleteCompleted();
     displayTodos();
  });

  // Tenemos un inconveniente porque el filtersLi es un arreglo y no podemos asignarle addEventListener
  filtersLI.forEach( element => { 

     /* Ahora aquí dentro ya tenemos los elementos HTML, entonces por cada elemento le agregamos el evento
        listener */  
    element.addEventListener('click', (element) => {
        // console.log(element.target);

        /* Ya está listo, pero cuando selecciono los filtros se queda pegado su clase selected 
           para ello vamos a eliminar de todos los elementos la clase selected, para que de esta
           manera pueda remover todos los filtros, selecciono uno, luego otro y se remueven todos. */ 
        filtersLI.forEach( el => el.classList.remove('selected'));

        // Tomaremos cada elemento y le añadimos la clase selected 
        element.target.classList.add('selected');

        // console.log(element.target.text);

        // Al momento de clickear un filtro podemos regresar su valor en texto, usamos switch para llamar
        // a nuestro todoStore en su método para establecer filtro. 
        switch( element.target.text ){
            case 'Todos': 
              todoStore.setFilter( Filters.All );
              break;
            case 'Pendientes': 
              todoStore.setFilter( Filters.Pending );
              break;
            case 'Completados': 
              todoStore.setFilter( Filters.Completed );
              break;

        }

        //Renderizamos 
        displayTodos();
    });
  });

};
