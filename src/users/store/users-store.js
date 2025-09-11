import { localhostUserModel } from "../mappers/localhost-to-user_mappers";
import { usersByPage } from "../use-cases/load-users-by-page";
// estado de mi pagina
const state = {

    currentpage: 0 ,
    users: [],
  
}
// cargar pagina
const nextPage = async () => {

    const users     = await usersByPage( state.currentpage + 1 ); 
    const arrusers  = users.data.map( localhostUserModel );
    if ( users.pages === state.currentpage) return; // si el numero de paginas es igual al numero actual de pagina retorna no continues
    state.currentpage += 1;
    state.users = arrusers;

}

const PreviousPage = async () => {
  
   if ( state.currentpage === 1 ) return ;

   state.currentpage -= 1;
   const users = await usersByPage ( state.currentpage );
   const arrusers = users.data.map( localhostUserModel )
   state.users = arrusers ;
 
}

// actualizcion de usuario 
const onUserChanged = () => {
    throw new Error("not implemented");

}

// recargar la paginas
const reloadPage = async () => {
    throw new Error("not Implemented");
    
}

export default {
    nextPage,
    onUserChanged,
    PreviousPage,
    reloadPage,
    
    /**
     * 
     * @returns { User[] }
     */
    getUser: () => [...state.users],
    /**
     * 
     * @returns { Number }
     */
    getcurrentPage: () => state.currentpage

}