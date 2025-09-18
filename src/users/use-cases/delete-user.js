import { localhostToUser } from "../mappers/localhost-to-user_mappers";

/**
 * 
 * @param { String||Number } id 
 * @returns 
 */
export const deleteUser = async ( id ) => {

    const url   = `${ import.meta.env.VITE_BASE_URL }/users/${ id }`;
    const res   = await fetch( url, { method: 'DELETE'} ); 
    const data  =  await res.json();
    const user  = localhostToUser(data);
    
    console.log({user});
    
    return true ;
   

}