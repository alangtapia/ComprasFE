import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../interfaces/articulo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<Articulo[]>{
    return this.http.get<Articulo[]>('https://compraswebapi.azurewebsites.net/api/Articulo/List');
  }

  getProveedorById(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`https://compraswebapi.azurewebsites.net/api/Articulo/Get/${id}`);
  }

  deleteProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`https://compraswebapi.azurewebsites.net/api/Articulo/Delete/${id}`);
  }

  agregarProveedor(articulo: Articulo): Observable<Articulo>{
    return this.http.post<Articulo>(`https://compraswebapi.azurewebsites.net/api/Articulo/Set`, articulo);
  }

  updateProveedor( id: number, articulo: Articulo): Observable<void>{
    return this.http.put<void>(`https://compraswebapi.azurewebsites.net/api/Articulo/Update/${id}`, articulo )
  }
}
