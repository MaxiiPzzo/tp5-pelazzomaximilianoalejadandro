import { Routes } from '@angular/router';
import { ProductosDestacadosComponent } from './productos-destacados/productos-destacados.component';
import { ProductosComponent } from './productos/productos.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { VentaTicketsComponent } from './venta-tickets/venta-tickets.component';
import { ResumenTicketsComponent } from './resumen-tickets/resumen-tickets.component';

export const routes: Routes = [
    {
        path:'',
        component:ProductosDestacadosComponent
    },
    {
        path:'editarProductos',
        component:ProductosComponent
    },
    {
        path:'transacciones',
        component:TransaccionesComponent
    },
    {
        path:'ventaTicket',
        component:VentaTicketsComponent
    },
    {
        path:'editarTicket/:id',
        component:VentaTicketsComponent
    },
    {
        path:'resumenTicket',
        component:ResumenTicketsComponent
    }
];
