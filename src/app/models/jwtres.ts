export interface Jwtres {
  datosUsuario: {
    id: string,
    usuario: string,
    correo: string,
    clave: string,
    tipo_de_usuario: string,
    accessToken: string,
    expiresIn: string
  }
}
