import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoProductosIdx } from '../interfaces/info-productos.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  cargando = true;

  productos: InfoProductosIdx[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http
      .get(
        'https://portafoliocatalogoproductos.firebaseio.com/productos_idx.json'
      )
      .subscribe((resp: InfoProductosIdx[]) => {
        this.productos = resp;
        console.log('Estos son Mis productos', resp);

        this.cargando = false;

        // setTimeout(() => {
        //   this.productos = resp;
        //   this.cargando = false;
        // }, 2000);
      });
  }
}
