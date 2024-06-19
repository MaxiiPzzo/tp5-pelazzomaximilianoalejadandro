export interface Producto {
    _id?: string,
    nombre: string,
    descripcion?: string,
    precio: number,
    imagen: string,
    stock: number,
    destacado: boolean,
    editandoState: boolean
}
