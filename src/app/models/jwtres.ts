export interface Jwtres {
  datosUsuario: {
    id: number,
    usuario: string,
    correo: string,
    clave: string,
    tipo_de_usuario: string,
    accessToken: string,
    expiresIn: string
  }
}
