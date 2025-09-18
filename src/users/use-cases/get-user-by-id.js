import { localhostToUser } from "../mappers/localhost-to-user_mappers";


export const getUserById = async ( id ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ id }`;
    const response = await fetch( url );
    const data = await response.json();

    const user = localhostToUser( data ); //my mappers dev
    
    return user; 

}