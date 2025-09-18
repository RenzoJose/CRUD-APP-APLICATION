
import{ User} from '../models/users'
/**
 * 
 * @param { like<User> } localhostUser 
 * @returns { User } keys dev
 */
export const localhostToUser = ( localhostUser ) => {
  
    // desestructuro la data --> que es un arreglo de objetos data: [{localhostUser}]
    const  {
        id,
        isActive,
        balance,
        avatar,
        first_name,
        last_name,
        gender,

    } = localhostUser;

    // retorno la instacia User, pasando todo los datos como argumento al constructor 
    return new User ({ 
        id,
        isActive,
        balance,
        avatar,
        firstName:first_name,
        lastName:last_name,
        gender,
    })

}

//* Note:
//  esta funcion de maper
// sirve como intermediario entre la data del servidor y nuestra aplicacion para cambiar las variables
// a traves de un molde creado en una clase class
// retornado una una instacia los nuevos nombre de la variable que apuntan a los valores de la data

// esto se realiza en funcion de no usar directamente los nombres de la data en toda la aplicacion 
// porque si cambian las keys de la data habria que cambiarla en toda la aplicacion.
// cabe destacar que esta tecnica de mapeo permite mejorar el soporte a nuestra aplicacion si la data cambia--ojo   