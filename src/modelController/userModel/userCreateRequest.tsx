export interface userCreateRequest {
    userID?:number;
    roleID?:number;
    role?:string;
    firstname?: string;
    lastname?: string,
    email?: string,
    phone?: number,
    password?: string,
    photo?: object
}
