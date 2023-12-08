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
    return this.http.get<Articulo[]>('http://localhost:5130/api/Articulo/List');
  }

  getProveedorById(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`http://localhost:5130/api/Articulo/Get/${id}`);
  }

  deleteProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:5130/api/Articulo/Delete/${id}`);
  }

  agregarProveedor(articulo: Articulo): Observable<Articulo>{
    return this.http.post<Articulo>(`http://localhost:5130/api/Articulo/Set`, articulo);
  }

  updateProveedor( id: number, articulo: Articulo): Observable<void>{
    return this.http.put<void>(`http://localhost:5130/api/Articulo/Update/${id}`, articulo )
  }
}
