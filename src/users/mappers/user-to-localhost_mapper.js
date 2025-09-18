import { User } from "../models/users";

/**
 * 
 * @param { User } user 
 * @returns { user } keys server
 */
export const userToLocalhost = ( user ) => {

    const {
        id,
        isActive,
        balance,
        avatar,
        firstName: first_name,
        lastName: last_name,
        gender,
    } = user;

    return {
        id,
        isActive,
        balance,
        avatar,
        first_name,
        last_name,
        gender,

    }

}