import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from '../interfaces/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<Departamento[]>{
    return this.http.get<Departamento[]>('https://compraswebapi.azurewebsites.net/api/Departamento/List');
  }

  getProveedorById(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`https://compraswebapi.azurewebsites.net/api/Department/${id}`);
  }

  deleteProveedor(id: number): Observable<void> {
    return this.http.delete<void>(`https://compraswebapi.azurewebsites.net/api/Department/${id}`);
  }

  agregarProveedor(departamento: Departamento): Observable<Departamento>{
    return this.http.post<Departamento>(`https://compraswebapi.azurewebsites.net/api/Department`, departamento);
  }

  updateProveedor( id: number, departamento: Departamento): Observable<void>{
    return this.http.put<void>(`https://compraswebapi.azurewebsites.net/api/Department/${id}`, departamento )
  }
}
