import { Producto } from './../interfaces/producto.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resolve, reject } from '../../../node_modules/@types/q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos : Producto[] = [];
  productosBusqueda : Producto[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    return new Promise((resolve, reject)=>{
      this.http.get('https://angular-7cfe2.firebaseio.com/productos_idx.json')
      .subscribe((res:Producto[]) =>{
          this.productos = res;
          this.cargando = false;
          resolve();
      });
    });
  }

  getProductos(id: string){
    return this.http.get(`https://angular-7cfe2.firebaseio.com/productos/${ id }.json`)
  }

  buscarProducto(termino:string){
    if(this.productos.length===0){
      //cargar productos
      this.cargarProductos().then(()=>{
        //codigo se ejecuta despues de tener los productos
        this.filtrarProductos(termino);
      });

    }else{
      //aplicar filtro
      this.filtrarProductos(termino);
    }    
  }

  private filtrarProductos(termino:string){
    this.productosBusqueda = [];

    termino= termino.toLocaleLowerCase();


    this.productos.forEach(prod=>{
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf(termino)>=0 || tituloLower.indexOf(termino)>=0){
        this.productosBusqueda.push(prod);
      }
    })

    console.log(this.productosBusqueda);
  }
}
