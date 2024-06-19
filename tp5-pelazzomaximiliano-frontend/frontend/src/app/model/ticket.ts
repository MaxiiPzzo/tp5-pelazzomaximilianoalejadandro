import { Espectador } from "./espectador";
import { Categoria } from './categoria';

export interface Ticket {
    precioTicket: number,
    categoriaEspectador: string,
    fechaCompra: Date,
    categoria?: string,
    espectador: string,
}

export interface TicketConEspectador {
    _id: string,
    precioTicket: number,
    categoriaEspectador: string,
    fechaCompra: Date,
    categoria?: Categoria,
    espectador: Espectador,
}