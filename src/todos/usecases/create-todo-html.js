/**
 * 
 * @param {Todo} todo 
 * @returns un elemento tipo Lista
 */
export const createTodoHTML = ( todo ) => {
    // Condicionamos si el todo existe 
    if(!todo) throw new Error('TODO es requerido');
    
    /* Podemos aplicar desestructuración de objetos para no
      llamar todo.done, todo.id, etc...y nada más llamarlo
      por su variable

        const {done, description, id} = todo; */ 

    // Creamos nuestro cuerpo HTML del Todo
    const html = 
       `<div class="view">
            <input class="toggle" type="checkbox" ${todo.done ? 'checked' : ''}>
            <label>${todo.description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">`;
   
    // Creamos un elemento list item
    const liElement = document.createElement('li');
    // Insertamos en la lista creada el cuerpo del Todo almacenado en la constante HTML
    liElement.innerHTML = html;    
    // Establecemos el atributo data-id al list element con el valor del id del Todo
    liElement.setAttribute('data-id', todo.id);

    //Condicionamos para poder añadir una clase 
    if(todo.done === true){
        liElement.classList.add('completed');
    }

    // Retornamos nuestro list element
    return liElement;
}