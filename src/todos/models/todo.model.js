import { v4 as uuid} from 'uuid';

//TODO -> Es una tarea pendiente, el proyecto se trata de lista de tareas 
export class Todo {

    constructor( description ){  
        this.id = uuid();
        this.description = description;
        this.done = false; 
        this.createdAt = new Date();
    }
}