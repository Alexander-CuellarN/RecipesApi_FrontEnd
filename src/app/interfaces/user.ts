export interface User {
    Idusuario?: number,
    NombreUsuario: string,
    CorreoElectronico: string,
    Contraseña: string

}


export interface usersResponse {
    message: string,
    data: User[]
}
