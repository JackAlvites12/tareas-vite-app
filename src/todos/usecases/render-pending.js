import todoStore, { Filters } from "../../store/todo.store";

let element;
export const renderPendingTodos = ( elementId) => {
    //Vamos a  renderizar los TODO´s pendientes
    if(!element){
        element = document.querySelector( elementId );
    }

    if(!element) throw new Error(`Element ${elementId} desconocido`);

    element.innerHTML = todoStore.getTodos( Filters.Pending ).length
}