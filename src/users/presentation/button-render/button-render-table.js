
import '../button-render/button-render.css'
import usersStore from '../../store/users-store'
import { renderTable } from '../table-render/render-table';
/**
 * 
 * @param { HTMLDivElement } element 
 */
export const buttonRender = ( element ) => {

    const nextbutton        = document.createElement('button');
    const prevbutton        = document.createElement('button');
    const currentPageLabel  = document.createElement('span');

    nextbutton.innerText    = ` Next > `;
    prevbutton.innerText    = ` < Prev `;
    currentPageLabel.innerText  = usersStore.getcurrentPage();
    currentPageLabel.id         = 'current-page';

    element.append( prevbutton, currentPageLabel, nextbutton );


    // evento click buttons
    nextbutton.addEventListener('click', async () => {
      
       await usersStore.nextPage(); // espera a que te carge los 10 datos siguiente
       currentPageLabel.innerText = usersStore.getcurrentPage();
       renderTable( element );

    })

    prevbutton.addEventListener('click', async () => {
        
        await usersStore.PreviousPage(); // espera a que te carga los 10 anteriores datos 
        currentPageLabel.innerHTML = usersStore.getcurrentPage();
        renderTable( element );
    })

}