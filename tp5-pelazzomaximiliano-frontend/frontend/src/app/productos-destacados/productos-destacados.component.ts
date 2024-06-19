import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ProductosService } from '../service/productos.service';
import { Producto } from '../model/productos.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productos-destacados',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, RouterLink],
  templateUrl: './productos-destacados.component.html',
  styleUrl: './productos-destacados.component.css'
})

export class ProductosDestacadosComponent implements OnInit,AfterViewInit {
  carouselWidth: number | undefined;
  cardWidth: number | undefined;
  scrollPosition: number = 0;

  productosDestacados: Producto[] = []
  constructor(
    private elRef: ElementRef,
    private productosService: ProductosService,
    private renderer: Renderer2
  ) {
    this.cargarProductos();
  }

  async ngOnInit() {
    await this.cargarProductos();
    this.cardWidth = this.elRef.nativeElement.querySelector('.carousel-item').offsetWidth
    
  }

  async ngAfterViewInit() {
    const carouselInner = this.elRef.nativeElement.querySelector('.carousel-inner');
    const nextControl = this.elRef.nativeElement.querySelector('.carousel-control-next');
    const prevControl = this.elRef.nativeElement.querySelector('.carousel-control-prev');

    this.renderer.listen(nextControl, 'click', () => {
      this.carouselWidth = this.elRef.nativeElement.querySelector('.carousel-inner').scrollWidth
      if(this.scrollPosition < (this.carouselWidth! - (this.cardWidth!*4))){
        this.scrollPosition += this.cardWidth!;
        console.log(this.scrollPosition)
        carouselInner.scrollTo({ left: this.scrollPosition, behavior: 'smooth' });
      }
    });

    this.renderer.listen(prevControl, 'click', () => {
      if (this.scrollPosition > 0) {
        this.scrollPosition -= this.cardWidth!;
        carouselInner.scrollTo({ left: this.scrollPosition, behavior: 'smooth' });
      }
    });
  }

  async cargarProductos() {
    try {
      this.productosService.getProductosDestacados().subscribe(
        (data:any)=>{
          console.log(data)
          this.productosDestacados = [...data]
        }, 
        (error:any)=>{
          console.log(error)
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
