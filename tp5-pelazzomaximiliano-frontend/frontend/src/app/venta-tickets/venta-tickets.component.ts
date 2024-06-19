import { CurrencyPipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../model/ticket';
import { Espectador } from '../model/espectador';
import { TicketsEspectadoresService } from '../service/tickets-espectadores.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Categoria } from '../model/categoria';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-venta-tickets',
  standalone: true,
  imports: [FormsModule,CurrencyPipe,RouterLink],
  templateUrl: './venta-tickets.component.html',
  styleUrl: './venta-tickets.component.css'
})
export class VentaTicketsComponent implements OnInit {
  editarTicket : Ticket = {
    precioTicket : NaN,
    categoriaEspectador : "",
    fechaCompra : new Date(),
    espectador : "",
    categoria: ""
  } 
  idModificar = ""
  editandoTicket = false
  espectadores : Espectador[] = []
  descuentoLocal = 0.2;
  descuento = 0;
  listadoCategorias : Categoria[] = []

  constructor(
    private ticketsEspectadoresService:TicketsEspectadoresService,
    private categoriaService:CategoriaService,
    private router : Router,
    private activatedRoute : ActivatedRoute
  ){
    this.cargarEspectadores()
    this.cargarCategorias()
  }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(
        params => {
          if(params['id']){
            this.idModificar = params['id']
            this.ticketsEspectadoresService.getTicketByID(this.idModificar).subscribe(
              (data:any) => {
                this.editandoTicket = true
                console.log('Editando ticket ' + this.idModificar)
                this.editarTicket = {...data}
                if(this.editarTicket.categoriaEspectador == 'l'){
                  this.editarTicket.precioTicket = this.editarTicket.precioTicket/(1-this.descuentoLocal)
                  this.descuento = 0.2;
                }
                console.log(data)
              },
              (error:any) => {
                console.log(error)
                this.router.navigate(['/resumenTicket'])
              }
            )
          }
        }
      )
  }

  get fechaFormatizada() {
    return formatDate(this.editarTicket.fechaCompra,'yyyy-MM-dd','en-US');
  }
  get precioCobrado() : number{
    return (this.editarTicket.precioTicket - this.editarTicket.precioTicket * this.descuento)
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

  cargarEspectadores(){
    this.ticketsEspectadoresService.getEspectadores().subscribe(
      (data:any) => {
        this.espectadores = [...data]
        console.log(this.espectadores)
      },
      (error:any) => {
        console.log(error)
      }
    )
  }

  registrarTicket(){
    this.editarTicket.precioTicket = this.precioCobrado
    if(!this.editandoTicket){
      this.ticketsEspectadoresService.registrarTicket(this.editarTicket).subscribe(
        (data:any) => {
          console.log(data)
          this.router.navigate(['/resumenTicket'])
        },
       (error:any) => {
        console.log(error)
       }
      )
    }
    else{
      console.log(this.editarTicket)
      this.ticketsEspectadoresService.modificarTicket(this.editarTicket,this.idModificar).subscribe(
        (data:any) => {
          console.log(data)
          this.router.navigate(['/resumenTicket'])
        },
        (error:any) => {
          console.log(error)
        }
      )
    }
  }
  

  actualizarDescuento(event : any){
    this.editarTicket.categoriaEspectador = event.target.value;
    switch(this.editarTicket.categoriaEspectador){
      case 'e':
        this.descuento = 0;
        break;
      case 'l':
        this.descuento = 0.2;
        break;
      default:
        this.descuento = 0;
        break;
    }
  }
}
