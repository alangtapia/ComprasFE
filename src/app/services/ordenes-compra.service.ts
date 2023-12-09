import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdenesCompra } from '../interfaces/OrdenesCompra';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenesCompraService {

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<OrdenesCompra[]>{
    return this.http.get<OrdenesCompra[]>('https://compraswebapi.azurewebsites.net/api/OrdenDeCompra/List');
  }

  getProveedorById(id: number): Observable<OrdenesCompra> {
    return this.http.get<OrdenesCompra>(`https://compraswebapi.azurewebsites.net/api/OrdenesCompra/${id}`);
  }

  deleteProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`https://compraswebapi.azurewebsites.net/api/OrdenesCompra/${id}`);
  }

  agregarProveedor(ordenes: OrdenesCompra): Observable<OrdenesCompra>{
    return this.http.post<OrdenesCompra>(`https://compraswebapi.azurewebsites.net/api/OrdenesCompra`, ordenes);
  }

  updateProveedor( id: number, ordenes: OrdenesCompra): Observable<void>{
    return this.http.put<void>(`https://compraswebapi.azurewebsites.net/api/OrdenesCompra/${id}`, ordenes )
  }
}
