import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Transaccion } from '../model/transacciones';
import { TransaccionesService } from '../service/transacciones.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transacciones-tabla',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './transacciones-tabla.component.html',
  styleUrl: './transacciones-tabla.component.css'
})

export class TransaccionesTablaComponent implements OnInit{
  @Input() transaccionRegistrada!: EventEmitter<void>;

  transacciones : Transaccion[] = []
  filtrarTransaccionesForm = false
  monOrigenForm = ""
  monDestinoForm = ""
  constructor(
    private transaccionesService : TransaccionesService
  ){
    this.cargarTransacciones()
  }

  ngOnInit(): void {
    this.transaccionRegistrada.subscribe(() => {
      this.cargarTransacciones();
    });
  }

  cargarTransacciones(){
    this.filtrarTransaccionesForm = false
    this.transaccionesService.getTransacciones().subscribe(
      (data:any) => {
        this.transacciones = [...data]
        console.log(this.transacciones)
      },
      (error:any) => {
        console.log(error)
      }
    )
  }
  cargarTransaccionesPorFiltro(){
    this.transaccionesService.getTransaccionesFiltradas(this.monOrigenForm,this.monDestinoForm).subscribe(
      (data:any) => {
        this.transacciones = [...data]
        console.log(this.transacciones)
      },
      (error:any) => {
        console.log(error)
      }
    )
  }
  validarFiltrarTransacciones(){
    return (!this.monOrigenForm || !this.monDestinoForm)
  }
  recargarTabla(){

  }
}
