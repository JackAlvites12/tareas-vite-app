import './style.css'
import { App } from './src/todos/app';

//Recordemos que el archivo main.js, osea este mismo se está llamando 
//como script en nuestro HTML, y aquí nosotros estamos llamando a la función 
//exportada App() del archivo app.js y le pasamos como parámetro el div con el 
//identificador -> app 
App('#app');

