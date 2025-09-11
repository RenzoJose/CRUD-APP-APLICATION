
// es una importacion global de un archivo css
import '../table-render/render-table.css'
import userStore from '../../store/users-store'
import { showModal } from '../modal-render/modal-render';

let table; //CREO UN ESPACIO EN  MEMORIA PARA LA TABLA y que este disponible globalmente 
const createTable = () => {

    const table         = document.createElement( 'table' );
    const tableHeaders  = document.createElement( 'thead' );
    const tableBody     = document.createElement( 'tbody' );
    
    tableHeaders.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Balance</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
        
    `
    table.append( tableHeaders, tableBody );
    return table 

}


/**callback anchor select 
 * 
 * @param { PointerEvent } event 
 */
const selectUserListener = ( event ) => {
       
    const selectUser = event.target.className === 'select-user'
    // console.log({ selectUser });
    
    if ( selectUser ){

      const id = event.target.getAttribute( 'data-id' );
    //   console.log({ id });
      
      showModal( id )
    }
    

}
/**
 * 
 * @param { HTMLDivElement } element 
 */
export const renderTable = ( element )=> {

    const users = userStore.getUser()

    // si no exite la tabla creala 
    if ( !table ) {
        table = createTable();
        element.append( table );
    }
    table.addEventListener('click', selectUserListener );
    let tableBody = ''; // lo defino vacio para que no redenrize el inicio undefined

    users.forEach( user => {
        tableBody +=  `
        <tr>
            <td>${ user.id }</td>
            <td>${ user.balance }</td>
            <td>${ user.firstName }</td>
            <td>${ user.lastName }</td>
            <td>${ user.isActive }</td>
            <td>
                <a href='#/' class='select-user' data-id='${ user.id }'>Select</a>
                |
                <a href='#/' class='delete-user'data-id='${ user.id }'>Delete</a>
            
            </td>
        </tr>
        `

    });

    table.querySelector('tbody').innerHTML = tableBody


}

// note: el atributo data-*, permite almacenar datos personalizados privados en cualquier elemento HTML
// Estos datos se pueden acceder y manipular a través de JavaScrip
// Los atributos deben empezar con data- seguido de un nombre válido
//* Acceso con JavaScript a los valores de estos atributos usando la interfaz dataset de un elemento o el método getAttribute(). 