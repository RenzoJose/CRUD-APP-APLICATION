
import { localhostToUser } from "../mappers/localhost-to-user_mappers"
import { userToLocalhost } from "../mappers/user-to-localhost_mapper";
import { User } from "../models/users"

// creacion y actualizacion de la data

/**
 * 
 * @param { Like<User> } likeUser 
 * @returns new User POST || PATCH in server
 */
export const saveUser = async ( likeUser ) => {

    const user = new User ( likeUser );
    
    if ( !user.firstName || !user.lastName ){
        alert(`First & Last Name are Required`);
        throw `input First & Last Name void`
    
    }
    
    const userSave = userToLocalhost( user ); // tranformo las keys como estan en el backend utilizando una funcion de intermediaria como mappers
        
    let updataUser = ( !user.id ) ?
            await createUser( userSave ) : await updataUsers( userSave ) ; 
        //lo recibo como esta servidos para evitar conflicto y hacer modificaciones al server 
    
            
    return localhostToUser( updataUser ); 
}

/**
 * 
 * @param { like<User> } user 
 */
const createUser = async ( user ) => {

    const url   = `${ import.meta.env.VITE_BASE_URL }/users`
    const req   = await fetch (url );
    const users = await req.json();

    if (Array.isArray(users)){

        const max = users.reduce(( max, item ) => {

            const id = Number( item.id );

           return id > max ? id : max

        }, 0 );
    
        user.id = String( max + 1 );

    }else{

        throw new Error( 'Database not found' );
        
    }
    
    try {
        
        const response = await fetch( url, {
            method: 'POST',
            body: JSON.stringify( user ),
            headers: {

                'Content-Type': 'application/json'
            }

        });

        if (!response.ok) throw new Error( "Error Saving User" );
    
        return await response.json();
        
    } catch (error) {

        
        console.warn('Error Create User', error.message);
        
        
    }
   
   
     
      

}
// actualizacion de data en el parte de servidor backend
/**
 * 
 * @param {Object<userToServer>} user 
 * @returns 
 */
const  updataUsers = async ( user ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ user.id }`
    const response = await fetch( url, {
        method: 'PATCH', // actualiza solo la parte que le paso
        body: JSON.stringify( user ),
        headers: {

            'Content-Type': 'application/json'
        }

    });
    
    return await response.json();

}