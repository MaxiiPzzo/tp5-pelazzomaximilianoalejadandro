import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../model/productos.model';
import { CurrencyPipe } from '@angular/common';
import { ProductosService } from '../service/productos.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [FormsModule, CurrencyPipe, RouterLink],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  productos: Producto[] = []
  constructor(
    private productosService: ProductosService
  ) {
    this.cargarProductos()
  }

  editandoProductoState = false
  productoEditar: Producto | undefined
  productoEjemplo: Producto = {
    _id: "i",
    nombre: "Tostador M34X Bobesponja",
    descripcion: "Que tostador más coquette...! ¿No lo crees? ;P",
    precio: 125.55,
    imagen: "https://www.spongebobshop.com/cdn/shop/products/NKL-23_Front_1800x1263_0756377c-73b7-4113-b391-ed6ca708db21_1024x1024.jpg?v=1632948242",
    stock: 12,
    destacado: true,
    editandoState: false
  }
  nuevoProducto: Producto = {
    nombre: "",
    descripcion: "",
    precio: NaN,
    imagen: "https://media.istockphoto.com/id/1219741272/photo/rad-cat-holding-a-blank-sign-isolated-on-black-background.jpg?s=612x612&w=0&k=20&c=FfLzsUu30sUTf22CNjB5TTzAjO-0RrhnPBRUU0vJ9kQ=",
    stock: NaN,
    destacado: false,
    editandoState: true
  }
  productoBorrar = {
    id: "",
    imagen: "",
    nombre: ""
  }

  cargarProductos(){
    this.productosService.getProductos().subscribe(
      (data: any) => {
        console.log(data)
        this.productos = [...data]
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  confirmarEliminacion(productoABorrar: Producto) {
    this.productoBorrar.id = productoABorrar._id!
    this.productoBorrar.imagen = productoABorrar.imagen
    this.productoBorrar.nombre = productoABorrar.nombre
  }

  borrarProducto(idBorrar: string) {
    this.productosService.deleteProducto(idBorrar).subscribe(
      (data: any) => {
        console.log(data)
        this.cargarProductos()
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  abrirFormularioNuevoProducto() {
    const nuevoProductoCopy = { ...this.nuevoProducto }
    this.editandoProductoState = true
    this.productoEditar = nuevoProductoCopy
    this.productos.push(nuevoProductoCopy)
  }

  editarProducto(productoEditando: Producto) {
    this.editandoProductoState = true
    productoEditando.editandoState = true
    this.productoEditar = { ...productoEditando }
  }

  cancelarEdicion(productoEditando: Producto) {
    if (!productoEditando._id) {
      this.productos.pop()
    }
    this.editandoProductoState = false
    productoEditando.editandoState = false
    this.productoEditar = undefined
  }

  guardarProducto(productoGuardar: Producto) {
    if (!productoGuardar._id) {
      this.productosService.createProducto(productoGuardar).subscribe(
        (data:any) => {
          console.log('Nuevo producto guardado.')
          console.log(data)
          this.cargarProductos()
        },
        (error:any) => {
          console.log(error)
        }
      )
    }
    else {
      console.log(productoGuardar)
      this.productosService.modificarProducto(productoGuardar).subscribe(
        (data:any) => {
          console.log('Modificaciones guardadas.')
          console.log(data)
          this.cargarProductos()
        },
        (error:any) => {
          console.log(error)
        }
      )
    }
    this.editandoProductoState = false
  }
}
