import { Producto } from './../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos : Producto[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    this.http.get('https://angular-7cfe2.firebaseio.com/productos_idx.json')
    .subscribe((res:Producto[]) =>{
      this.productos = res;
        this.cargando = false;
    })
  }
}
