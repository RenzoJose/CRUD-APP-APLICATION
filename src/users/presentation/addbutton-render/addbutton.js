
import '../addbutton-render/addbutton.css'
import { showModal } from '../modal-render/modal-render';

/**
 * 
 * @param { HTMLDivElement } element 
 * @param { showModal } callback 
 */
export const addButtonRender = ( element, callback ) => {

    const fabAddbutton      = document.createElement('button');
    fabAddbutton.innerHTML  = `<b> + </b> `;
    fabAddbutton.classList.add('fab-button');
    element.append( fabAddbutton );

    fabAddbutton.addEventListener('click', () => callback()); // ejecuto arowfunction anonima sin argumentos para evitar que se pase el mauseevent como argumento y la funcion showmodal ejecuta dos estados uno con id  que muestra la data en el modal y otro sin id que muestre solo modal para agregar datos 

}