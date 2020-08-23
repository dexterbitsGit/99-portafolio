import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoProductosIdx } from '../interfaces/info-productos.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  cargando = true;
  productos: InfoProductosIdx[] = [];
  productosFiltrado: InfoProductosIdx[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http
        .get(
          'https://portafoliocatalogoproductos.firebaseio.com/productos_idx.json'
        )
        .subscribe((resp: InfoProductosIdx[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
          // setTimeout(() => {
          //   this.productos = resp;
          //   this.cargando = false;
          // }, 2000);
        });
    });
  }

  public getProducto(id: string) {
    return this.http.get(
      `https://portafoliocatalogoproductos.firebaseio.com/productos/${id}.json`
    );
  }

  public buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      // cargar productos
      this.cargarProductos().then(() => {
        // ejecutar despues de tener los productos
        // Aplicar Filtros
        this.filtrarProductos(termino);
      });
    } else {
      // aplicar el filtro
      this.filtrarProductos(termino);
    }

  }

  private filtrarProductos(termino: string) {

    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach((prod) => {
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if (
        prod.categoria.indexOf(termino) >= 0 ||
        tituloLower.indexOf(termino) >= 0
      ) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
