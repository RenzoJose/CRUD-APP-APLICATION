import { User } from "../models/users";
import { localhostUserModel } from "../mappers/localhost-to-user_mappers";
/**
 * 
 * @param { Number } page 
 * @returns { Promise<User[]> }
 */
export const usersByPage = async ( page = 1 ) => {

    const env        = import.meta.env
    const url        = `${ env.VITE_BASE_URL2 }?_page=${ page }`;
    const response   = await fetch(url);
    const dataObject = await response.json();
    // const users      = dataObject.data.map( localhostUserModel );

    return dataObject
}