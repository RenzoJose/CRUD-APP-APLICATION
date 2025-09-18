import modalHtml from '../modal-render/modal-render.html?raw'
import '../modal-render/modal-render.css'
import { getUserById } from '../../use-cases/get-user-by-id';
/**
 * note: loadUser = {}; sirve para saber si hubo informacion cargada y luego ponersela al objeto que mandamos a guardar con sumit en el form
 */
let modal, form, loadUser = {};

/**
 * 
 * @param { String|Number } id 
 * @returns 
 */
export const showModal = async ( id ) =>{
    modal?.classList.remove( 'hidden-modal' ); 
    loadUser = {};
     
    if ( !id ) return; // si no existe retorna no continues
    const user = await getUserById( id );
    setFormValue( user );
}

export const hiddenModal = () => {

    modal?.classList.add( 'hidden-modal' );
    form?.reset();// si el formulario existe reset de sus campos al hacer click ocultarlo
}

const setFormValue = ( user ) => {

    form.querySelector('input[name="firstName"]').value  = user.firstName;
    form.querySelector('input[name="lastName"]').value   = user.lastName;
    form.querySelector('input[name="balance"]').value   = user.balance;
    form.querySelector('input[name="isActive"]').checked = user.isActive;
    loadUser = user ; //FIXME: PORQUE LO USO?? SOBRE ESCRIBE EL USER DATE DEL FORM?
}


/**
 * 
 * @param { HTMLDivElement } element 
 * @param { ( userdata ) => Promise<void> } callBackNewUser 
 * @returns  
 */
export const modalRender = ( element, callBackNewUser ) => {

    if ( modal ) return ; // si ya exite el modal no continues retorna !! caso contrario continua al siguiente script

    modal = document.createElement( 'div' );
    modal.innerHTML = modalHtml
    modal.classList.add( 'modal-container', 'hidden-modal');
    element.append( modal );

    form = modal.querySelector( 'form' ); // en el div modal selecciono el formulario 

    // se verifica si se hizo click div class 
    modal.addEventListener( 'click', event => {

       if ( event.target.classList[0] === 'modal-dialog' ) {
        hiddenModal();
       }
        
    });

    form.addEventListener( 'submit', ( event ) => {
       
        event.preventDefault(); // cancela la reacarga por defecto submit

        const check     = document.querySelector('[name="isActive"]')
        const formData  = new FormData( form );
        const userData  = {...loadUser}; //FIXME: WITH {} AND {...loadUser}
        
        
        for (const [ key, value ] of formData ) {
                       
            // validamos balance sea siempre de tipo Number  
            if ( key === 'balance' ){

                userData[key] = Number(value);
                continue; 
            }

            userData[key] = value;
        }
        // verficico por fuera del for el estado del formulario de name: isActive, para agregarlo al objeto plano, este activo o no
        // porque new FormData( form ) solo incluye los campos "activos" (con valor)
        userData['isActive'] = check.checked
                
        hiddenModal(); // al darle click oculto el modal 
        callBackNewUser( userData ); /// llamo a la funcion y le paso los datos 
    })
}

// FIXME: preventDefault()??? 
// FormData()?? import! Si un input no tiene name, no será incluido en el FormData.
// FormData es iterable

// y su iterador devuelve pares [clave, valor]
// Cuando usás new FormData(form), solo los campos "activos" (con valor) se incluyen automáticamente.
// que es justo lo que Object.fromEntries() necesita para construir un objeto plano
// OJO con campos repetidos

// Si tenés varios input con el mismo name, por ejemplo checkboxes, solo se guarda el último valor en el objeto plano
//  invetigation
// note: si querés saltar el resto del código en la iteración actual y pasar a la siguiente vuelta, entonces sí necesitás usar continue.
// El if se ejecuta, pero el resto del código igual se ejecuta después.
// el continue salta todo lo que hay después y sigue con la próxima iteración del bucle.
// saltar el resto de la iteración si se cumple el if