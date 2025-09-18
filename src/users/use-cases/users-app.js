
import { addButtonRender } from '../presentation/addbutton-render/addbutton';
import { buttonRender } from '../presentation/button-render/button-render-table';
import { modalRender, showModal } from '../presentation/modal-render/modal-render';
import { renderTable } from '../presentation/table-render/render-table';
import usersStore  from '../store/users-store';
import { saveUser } from './save-user';

/**
 * 
 * @param { HTMLDivElement } element 
 */
export const usersApp = async ( element ) => {

    await usersStore.nextPage(); // ESPERA A REPONDA EL FECTH Y CARGA LA PRIMERA PAGINA EN EL ESTADO (STATE{}) QUE ESTARA POR REFERENCIA GUARDADO 

    renderTable( element ); // note: como es una operacion asincrona espera los resultados del fetch y despues renderizas
    buttonRender( element );
    addButtonRender( element, showModal ); //BOTON + PARA RENDERIZAR EL MODAL

    modalRender( element, async ( userLike ) => {
            
        const user = await saveUser( userLike ).catch( e => console.warn( e ) );
        usersStore.onUserChanged( user ).catch( e => console.warn(`ausencia de ID por error anterior ${e}`));
        renderTable();
    });
}

//* NOTE: 
// el argumento es user{DATOS} del sumit del modal QUE SE PASA POR REFERENCIA porque es el producto de esa funcion, y saveUser a su vez devuelve creacion del nuevo usuario en el server (metodo POST) o actualizacion PARCIAL con (metodo PATCH)