import { localhostToUser } from "../mappers/localhost-to-user_mappers";
// import { renderTable } from "../presentation/table-render/render-table";
import { usersByPage } from "../use-cases/load-users-by-page";
// estado de mi pagina
const state = {

    currentpage: 0 ,
    users: [],
  
}
// cargar pagina siguiente
const nextPage = async () => {

    const users     = await usersByPage( state.currentpage + 1 ); 
    const arrusers  = users.data.map( localhostToUser );
    
    if ( users.pages === state.currentpage) return; // si el numero de paginas es igual al numero actual de pagina retorna no continues
    state.currentpage += 1;
    state.users = arrusers;

}
// cargar pagina anterior 
const PreviousPage = async (  ) => {

    if ( state.currentpage === 1 ) return ;

    state.currentpage -= 1
    const users = await usersByPage( state.currentpage );

    const arrusers = users.data.map( localhostToUser )
    state.users = arrusers ;

}

// actualizcion live usuario si ya exite o si es nuevo
/**
 * 
 * @param { User } updateUser 
 */
const onUserChanged = async ( updateUser ) => {
     
    let flat = false 
    // si existe actualizo si no ENVIA LO MISMO USUARIOS 
    state.users = state.users.map( user => {

        if  ( user.id === updateUser.id ){
            flat = true; 
            return updateUser; 

        } else {
        
            return user ;

        }
    })
        
    //una vez guardado renderiza el nuevo
    if (state.users.length < 10 && !flat ) {
      
        state.users.push( updateUser )
    }

   

}

// recargar la paginas al eliminar un elemento
const reloadPage = async () => {
   
    const users = await usersByPage( state.currentpage );
    const arrusers = users.data.map( localhostToUser );
       
    if ( (users.items % 10) === 0){
        
        await PreviousPage()
        
        return;
    };
 
    
    state.users = arrusers
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