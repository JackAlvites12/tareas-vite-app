/**
 * 
 * @param {Todo} todo 
 * @returns un elemento tipo Lista
 */
export const createTodoHTML = ( todo ) => {
    if(!todo) throw new Error('TODO es requerido');
    //Podemos aplicar desestructuración de objetos para no
    //llamar todo.done, todo.id, etc...y nada más llamarlo
    //por su variable

    //const {done, description, id} = todo;

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.done ? 'checked' : ''}>
            <label>${todo.description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
        `;
   
    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', todo.id);

    if(todo.done === true){
        liElement.classList.add('completed');
    }


    return liElement;
}