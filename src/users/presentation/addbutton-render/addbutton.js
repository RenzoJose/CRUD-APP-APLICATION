
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

    fabAddbutton.addEventListener('click', callback);

}