
import { userToLocalhost } from "../mappers/user-to-localhost_mapper";
import { User } from "../models/users"

// creacion y actualizacion de la data

/**
 * 
 * @param { Like<User> } likeUser 
 * @returns {like<updatedUser>} updatedUser POST in server
 */
export const saveUser = async ( likeUser ) => {

    const user = new User ( likeUser );
    const userToServer = userToLocalhost( user ); // tranformo las keys como estan en el backend utilizando una funcion de intermediaria como mappers
  
    if ( userToServer.id ) {

        throw new Error("Not Implement");        
        
    }

    const updatedUser = await createUser( userToServer);
    return updatedUser;

}

/**
 * 
 * @param { like<User> } user 
 */
const createUser = async ( user ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users`
    const response = await fetch( url, {
        method: 'POST',
        body: JSON.stringify( user ),
        headers: {

            'Content-Type': 'application/json'
        }

    });
    const newUser = await response.json();
    console.log({ newUser });
    
    return newUser;

}