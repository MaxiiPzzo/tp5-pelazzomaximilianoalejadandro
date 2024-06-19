import { Component } from '@angular/core';
import { TicketsEspectadoresService } from '../service/tickets-espectadores.service';
import { Ticket, TicketConEspectador } from '../model/ticket';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../model/categoria';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-resumen-tickets',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink, FormsModule],
  templateUrl: './resumen-tickets.component.html',
  styleUrl: './resumen-tickets.component.css'
})
export class ResumenTicketsComponent {
  opcionFiltro = "todo"
  listadoTickets: TicketConEspectador[] = []
  idTicketBorrar = ""
  listadoCategorias : Categoria[] = []
  categoriaAFiltrar = ""
  constructor(
    private ticketsEspectadoresService: TicketsEspectadoresService,
    private categoriaService: CategoriaService
  ) {
    this.cargarTodo()
    this.cargarCategorias()
  }

  cargarCategorias(){
    this.categoriaService.getCategorias().subscribe(
      (data:any) => {
        this.listadoCategorias = [...data]
        console.log(this.listadoCategorias)
      },
      (error:any) =>{
        console.log(error)
      }
    )
  }

  async cargarListaPorCategoria(){
    this.ticketsEspectadoresService.getTicketsByCategoriaTicket(this.categoriaAFiltrar).subscribe(
      (data: any) => {
        this.listadoTickets = [...data]
        console.log(this.listadoTickets)
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  cargarTodo() {
    this.ticketsEspectadoresService.getTickets().subscribe(
      (data: any) => {
        this.listadoTickets = [...data]
        console.log(this.listadoTickets)
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  cargarLista() {
    switch (this.opcionFiltro) {
      case 'todo':
        this.cargarTodo()
        break
      case 'local':
        this.cargarListaCategoria('l')
        break
      case 'extranjero':
        this.cargarListaCategoria('e')
        break
      case 'filtro':
        this.cargarListaPorCategoria()
        break
    }
  }

  cargarListaCategoria(categoria: string) {
    this.ticketsEspectadoresService.getTicketsByCategoria(categoria).subscribe(
      (data: any) => {
        this.listadoTickets = [...data]
        console.log(this.listadoTickets)
      },
      (error: any) => {
        console.log(error)
      }
    )
  }
  confirmarEliminacion(idTicket: string) {
    this.idTicketBorrar = idTicket
  }
  borrarTicket() {
    this.ticketsEspectadoresService.borrarTicket(this.idTicketBorrar).subscribe(
      (data: any) => {
        console.log(data)
        this.cargarLista()
      },
      (error: any) => {
        console.log(error)
      },
    )
  }
}
