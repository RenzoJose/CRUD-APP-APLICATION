
// MODEL DATA USER
export class User {
    /**
     * 
     * @param { like<Object> } userDataLike
     */
    constructor ( { id, isActive, balance = 0, avatar= 'Not Information' , firstName, lastName, gender= 'Not Information' } ) {
        
        this.id         = id;
        this.isActive   = isActive;
        this.balance    = balance;
        this.avatar     = avatar;
        this.firstName  = firstName;
        this.lastName   = lastName;
        this.gender     = gender;

    }

}