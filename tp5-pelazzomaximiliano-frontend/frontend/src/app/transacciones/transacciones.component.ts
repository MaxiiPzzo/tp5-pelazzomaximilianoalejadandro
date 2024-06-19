import { Component, EventEmitter, Output } from '@angular/core';
import { ApiConversionService } from '../service/api-conversion.service';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Transaccion } from '../model/transacciones';
import { TransaccionesService } from '../service/transacciones.service';
import { TransaccionesTablaComponent } from '../transacciones-tabla/transacciones-tabla.component';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, TransaccionesTablaComponent],
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.css'
})
export class TransaccionesComponent {
  @Output() transaccionRegistrada = new EventEmitter<void>();

  nuevaTransaccion: Transaccion = {
    emailCliente: "",
    cantidadOrigen: NaN,
    monedaOrigen: "",
    cantidadDestino: NaN,
    monedaDestino: "",
    tasaConversion: NaN
  }
  simbolos: Array<any> | undefined;
  transaccionConvertida = false;
  constructor(
    private conversionService: ApiConversionService,
    private transaccionesService: TransaccionesService
  ) {
    conversionService.getSimbolos().subscribe(
      (data: any) => {
        this.simbolos = Object.keys(data.symbols).map(key => {
          return { nombre: data.symbols[key], simbolo: key };
        });
        console.log(this.simbolos)
      },
      (error: any) => {
        console.log(error)
      })
  }

  validarSelects() {
    return this.nuevaTransaccion.monedaOrigen == this.nuevaTransaccion.monedaDestino
  }

  convertirMoneda() {
    this.conversionService.convertirMoneda(this.nuevaTransaccion.monedaOrigen, this.nuevaTransaccion.monedaDestino, this.nuevaTransaccion.cantidadOrigen).subscribe(
      (data: any) => {
        console.log(data)
        this.nuevaTransaccion.cantidadDestino = data.result
        this.nuevaTransaccion.tasaConversion = data.info.rate
        console.log(this.nuevaTransaccion)
      },
      (error: any) => {
        console.log(error)
      })
    this.transaccionConvertida = true
  }

  registrarTransaccion() {
    this.transaccionesService.crearNuevaTransaccion(this.nuevaTransaccion).subscribe(
      (data: any) => {
        console.log(data)
        this.transaccionRegistrada.emit()
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

}
